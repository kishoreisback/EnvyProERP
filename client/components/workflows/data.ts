import {
  TenantWorkflow,
  WorkflowExecution,
  WorkflowAnalytics,
  WorkflowIntegration,
  WorkflowStatus,
  WorkflowCategory,
  WorkflowTriggerType,
  NodeTemplate,
} from "./types";

// Mock workflows for multiple tenants
export const mockWorkflows: TenantWorkflow[] = [
  // Tenant 1 - BuildCorp Constructions
  {
    id: "workflow_001",
    tenantId: "tenant_001",
    name: "Project Approval Workflow",
    description:
      "Automated project approval process with budget validation and stakeholder notifications",
    category: "approval",
    version: "1.2.0",
    status: "active",
    trigger: {
      type: "form_submission",
      config: {
        formId: "project_request_form",
        triggerOnSubmit: true,
      },
      conditions: [
        {
          field: "budget",
          operator: "greater_than",
          value: 100000,
        },
      ],
    },
    nodes: [
      {
        id: "start_001",
        type: "start",
        position: { x: 100, y: 100 },
        data: {
          label: "Project Request Submitted",
          description: "Triggers when a new project request is submitted",
          config: { triggerType: "form_submission" },
          outputs: [{ id: "output", name: "Project Data", type: "object" }],
        },
      },
      {
        id: "condition_001",
        type: "condition",
        position: { x: 400, y: 100 },
        data: {
          label: "Budget Validation",
          description: "Check if project budget exceeds approval threshold",
          config: {
            condition: "budget > 1000000",
            trueLabel: "Requires Approval",
            falseLabel: "Auto Approve",
          },
          inputs: [
            {
              id: "input",
              name: "Project Data",
              type: "object",
              required: true,
            },
          ],
          outputs: [
            { id: "true", name: "High Budget", type: "object" },
            { id: "false", name: "Low Budget", type: "object" },
          ],
        },
      },
      {
        id: "notification_001",
        type: "notification",
        position: { x: 700, y: 50 },
        data: {
          label: "Notify Manager",
          description: "Send approval request to project manager",
          config: {
            templateId: "template_001",
            recipients: ["role:project_manager"],
            channels: ["email", "in_app"],
            priority: "high",
          },
          inputs: [
            {
              id: "input",
              name: "Project Data",
              type: "object",
              required: true,
            },
          ],
          outputs: [
            { id: "output", name: "Notification Result", type: "object" },
          ],
        },
      },
      {
        id: "approval_001",
        type: "approval",
        position: { x: 1000, y: 50 },
        data: {
          label: "Manager Approval",
          description: "Wait for manager approval or rejection",
          config: {
            approvers: ["role:project_manager"],
            timeout: 86400000, // 24 hours
            reminderInterval: 14400000, // 4 hours
          },
          inputs: [
            {
              id: "input",
              name: "Notification Result",
              type: "object",
              required: true,
            },
          ],
          outputs: [
            { id: "approved", name: "Approved", type: "object" },
            { id: "rejected", name: "Rejected", type: "object" },
            { id: "timeout", name: "Timeout", type: "object" },
          ],
        },
      },
      {
        id: "action_001",
        type: "action",
        position: { x: 700, y: 150 },
        data: {
          label: "Auto Approve",
          description: "Automatically approve low-budget projects",
          config: {
            actionType: "update_status",
            parameters: { status: "approved" },
          },
          inputs: [
            {
              id: "input",
              name: "Project Data",
              type: "object",
              required: true,
            },
          ],
          outputs: [{ id: "output", name: "Updated Project", type: "object" }],
        },
      },
      {
        id: "end_001",
        type: "end",
        position: { x: 1300, y: 100 },
        data: {
          label: "Workflow Complete",
          description: "Project approval workflow completed",
          config: { success: true },
          inputs: [{ id: "input", name: "Final Result", type: "object" }],
        },
      },
    ],
    connections: [
      {
        id: "conn_001",
        sourceNodeId: "start_001",
        targetNodeId: "condition_001",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_002",
        sourceNodeId: "condition_001",
        targetNodeId: "notification_001",
        sourceHandle: "true",
        targetHandle: "input",
        label: "High Budget",
      },
      {
        id: "conn_003",
        sourceNodeId: "condition_001",
        targetNodeId: "action_001",
        sourceHandle: "false",
        targetHandle: "input",
        label: "Low Budget",
      },
      {
        id: "conn_004",
        sourceNodeId: "notification_001",
        targetNodeId: "approval_001",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_005",
        sourceNodeId: "approval_001",
        targetNodeId: "end_001",
        sourceHandle: "approved",
        targetHandle: "input",
        label: "Approved",
      },
      {
        id: "conn_006",
        sourceNodeId: "action_001",
        targetNodeId: "end_001",
        sourceHandle: "output",
        targetHandle: "input",
      },
    ],
    variables: [
      {
        id: "var_001",
        name: "projectBudget",
        type: "number",
        description: "Project budget amount",
        scope: "global",
      },
      {
        id: "var_002",
        name: "approverEmail",
        type: "string",
        description: "Email of the approver",
        scope: "execution",
      },
    ],
    settings: {
      autoSave: true,
      enableLogging: true,
      logLevel: "info",
      maxExecutionTime: 3600,
      maxConcurrentExecutions: 10,
      retryPolicy: {
        enabled: true,
        maxRetries: 3,
        retryDelay: 300,
        exponentialBackoff: true,
      },
      notifications: {
        onSuccess: true,
        onFailure: true,
        onTimeout: true,
        recipients: ["user_001"],
        channels: ["email"],
      },
      requireApproval: false,
      cacheResults: true,
      cacheTTL: 3600,
      enableMetrics: true,
      enableTracing: true,
      environment: "production",
    },
    visibility: "public",
    permissions: {
      canView: ["all"],
      canEdit: ["role:admin", "role:project_manager"],
      canDelete: ["role:admin"],
      canExecute: ["role:admin", "role:project_manager", "role:employee"],
      canApprove: ["role:admin"],
      canShare: ["role:admin", "role:project_manager"],
      canCopy: ["role:admin", "role:project_manager"],
      canExport: ["role:admin"],
      canManagePermissions: ["role:admin"],
    },
    createdBy: "user_001",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
    executionCount: 45,
    successCount: 42,
    failureCount: 3,
    lastExecuted: "2024-01-25T10:30:00Z",
    averageExecutionTime: 2400000, // 40 minutes
    isTemplate: false,
    tags: ["project", "approval", "budget"],
    folder: "Project Management",
    publishedVersion: "1.2.0",
    draftChanges: false,
  },

  // Tenant 2 - Metro Realty Group
  {
    id: "workflow_002",
    tenantId: "tenant_002",
    name: "Lead Assignment Workflow",
    description:
      "Automated lead assignment based on agent availability and expertise",
    category: "crm",
    version: "2.1.0",
    status: "active",
    trigger: {
      type: "webhook",
      config: {
        url: "/webhooks/lead-created",
        method: "POST",
      },
      webhookConfig: {
        url: "https://api.metrorealty.com/webhooks/lead",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer TOKEN",
        },
        authentication: {
          type: "bearer",
          credentials: { token: "api_token_here" },
        },
      },
    },
    nodes: [
      {
        id: "start_002",
        type: "start",
        position: { x: 100, y: 100 },
        data: {
          label: "New Lead Created",
          description: "Triggered when a new lead is created in the system",
          config: { triggerType: "webhook" },
          outputs: [{ id: "output", name: "Lead Data", type: "object" }],
        },
      },
      {
        id: "data_001",
        type: "data",
        position: { x: 400, y: 100 },
        data: {
          label: "Enrich Lead Data",
          description: "Fetch additional lead information and scoring",
          config: {
            dataSource: "crm_api",
            endpoint: "/leads/enrich",
            method: "GET",
          },
          inputs: [
            { id: "input", name: "Lead Data", type: "object", required: true },
          ],
          outputs: [{ id: "output", name: "Enriched Lead", type: "object" }],
        },
      },
      {
        id: "condition_002",
        type: "condition",
        position: { x: 700, y: 100 },
        data: {
          label: "Lead Priority Check",
          description: "Determine lead priority based on value and source",
          config: {
            condition: "leadValue >= 5000000 || leadSource === 'referral'",
            trueLabel: "High Priority",
            falseLabel: "Standard Priority",
          },
          inputs: [
            {
              id: "input",
              name: "Enriched Lead",
              type: "object",
              required: true,
            },
          ],
          outputs: [
            { id: "true", name: "High Priority Lead", type: "object" },
            { id: "false", name: "Standard Lead", type: "object" },
          ],
        },
      },
      {
        id: "action_002",
        type: "action",
        position: { x: 1000, y: 50 },
        data: {
          label: "Assign to Senior Agent",
          description: "Assign high-priority leads to senior sales agents",
          config: {
            actionType: "assign_lead",
            parameters: {
              agentType: "senior",
              notifyImmediately: true,
            },
          },
          inputs: [
            {
              id: "input",
              name: "High Priority Lead",
              type: "object",
              required: true,
            },
          ],
          outputs: [
            { id: "output", name: "Assignment Result", type: "object" },
          ],
        },
      },
      {
        id: "action_003",
        type: "action",
        position: { x: 1000, y: 150 },
        data: {
          label: "Assign to Available Agent",
          description:
            "Assign standard leads to available agents using round-robin",
          config: {
            actionType: "assign_lead",
            parameters: {
              agentType: "available",
              method: "round_robin",
            },
          },
          inputs: [
            {
              id: "input",
              name: "Standard Lead",
              type: "object",
              required: true,
            },
          ],
          outputs: [
            { id: "output", name: "Assignment Result", type: "object" },
          ],
        },
      },
      {
        id: "notification_002",
        type: "notification",
        position: { x: 1300, y: 100 },
        data: {
          label: "Notify Agent",
          description:
            "Send lead assignment notification to the assigned agent",
          config: {
            templateId: "template_002",
            recipients: ["assignedAgent"],
            channels: ["email", "sms", "in_app"],
            priority: "urgent",
          },
          inputs: [
            {
              id: "input",
              name: "Assignment Result",
              type: "object",
              required: true,
            },
          ],
          outputs: [
            { id: "output", name: "Notification Sent", type: "object" },
          ],
        },
      },
      {
        id: "end_002",
        type: "end",
        position: { x: 1600, y: 100 },
        data: {
          label: "Assignment Complete",
          description: "Lead assignment workflow completed",
          config: { success: true },
          inputs: [{ id: "input", name: "Final Result", type: "object" }],
        },
      },
    ],
    connections: [
      {
        id: "conn_007",
        sourceNodeId: "start_002",
        targetNodeId: "data_001",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_008",
        sourceNodeId: "data_001",
        targetNodeId: "condition_002",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_009",
        sourceNodeId: "condition_002",
        targetNodeId: "action_002",
        sourceHandle: "true",
        targetHandle: "input",
        label: "High Priority",
      },
      {
        id: "conn_010",
        sourceNodeId: "condition_002",
        targetNodeId: "action_003",
        sourceHandle: "false",
        targetHandle: "input",
        label: "Standard",
      },
      {
        id: "conn_011",
        sourceNodeId: "action_002",
        targetNodeId: "notification_002",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_012",
        sourceNodeId: "action_003",
        targetNodeId: "notification_002",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_013",
        sourceNodeId: "notification_002",
        targetNodeId: "end_002",
        sourceHandle: "output",
        targetHandle: "input",
      },
    ],
    variables: [
      {
        id: "var_003",
        name: "leadValue",
        type: "number",
        description: "Estimated lead value",
        scope: "global",
      },
      {
        id: "var_004",
        name: "assignedAgent",
        type: "string",
        description: "ID of the assigned agent",
        scope: "execution",
      },
    ],
    settings: {
      autoSave: true,
      enableLogging: true,
      logLevel: "info",
      maxExecutionTime: 1800,
      maxConcurrentExecutions: 20,
      retryPolicy: {
        enabled: true,
        maxRetries: 2,
        retryDelay: 60,
        exponentialBackoff: false,
      },
      notifications: {
        onSuccess: false,
        onFailure: true,
        onTimeout: true,
        recipients: ["user_004"],
        channels: ["email"],
      },
      requireApproval: false,
      cacheResults: false,
      cacheTTL: 0,
      enableMetrics: true,
      enableTracing: true,
      environment: "production",
    },
    visibility: "team",
    permissions: {
      canView: ["role:admin", "role:sales_manager", "role:sales_agent"],
      canEdit: ["role:admin", "role:sales_manager"],
      canDelete: ["role:admin"],
      canExecute: ["all"],
      canApprove: ["role:admin"],
      canShare: ["role:admin", "role:sales_manager"],
      canCopy: ["role:admin"],
      canExport: ["role:admin"],
      canManagePermissions: ["role:admin"],
    },
    createdBy: "user_004",
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-01-25T00:00:00Z",
    executionCount: 128,
    successCount: 124,
    failureCount: 4,
    lastExecuted: "2024-01-25T09:30:00Z",
    averageExecutionTime: 450000, // 7.5 minutes
    isTemplate: false,
    tags: ["crm", "lead", "assignment", "automation"],
    folder: "Sales Automation",
    publishedVersion: "2.1.0",
    draftChanges: false,
  },

  // Tenant 3 - Skyline Developers
  {
    id: "workflow_003",
    tenantId: "tenant_003",
    name: "Maintenance Alert Workflow",
    description: "Scheduled maintenance alerts and system notifications",
    category: "system",
    version: "1.0.0",
    status: "active",
    trigger: {
      type: "schedule",
      config: {
        scheduleType: "recurring",
      },
      schedule: {
        type: "recurring",
        timezone: "Asia/Kolkata",
        recurrence: {
          frequency: "weekly",
          interval: 1,
          daysOfWeek: [1], // Monday
        },
      },
    },
    nodes: [
      {
        id: "start_003",
        type: "start",
        position: { x: 100, y: 100 },
        data: {
          label: "Scheduled Trigger",
          description: "Runs every Monday at 8:00 AM",
          config: { triggerType: "schedule" },
          outputs: [{ id: "output", name: "Trigger Data", type: "object" }],
        },
      },
      {
        id: "data_002",
        type: "data",
        position: { x: 400, y: 100 },
        data: {
          label: "Check System Status",
          description: "Retrieve system health and maintenance status",
          config: {
            dataSource: "system_api",
            endpoint: "/system/health",
            method: "GET",
          },
          inputs: [
            {
              id: "input",
              name: "Trigger Data",
              type: "object",
              required: true,
            },
          ],
          outputs: [{ id: "output", name: "System Status", type: "object" }],
        },
      },
      {
        id: "condition_003",
        type: "condition",
        position: { x: 700, y: 100 },
        data: {
          label: "Maintenance Required?",
          description: "Check if any systems require maintenance",
          config: {
            condition: "maintenanceRequired === true",
            trueLabel: "Maintenance Needed",
            falseLabel: "All Systems OK",
          },
          inputs: [
            {
              id: "input",
              name: "System Status",
              type: "object",
              required: true,
            },
          ],
          outputs: [
            { id: "true", name: "Maintenance Required", type: "object" },
            { id: "false", name: "No Maintenance", type: "object" },
          ],
        },
      },
      {
        id: "notification_003",
        type: "notification",
        position: { x: 1000, y: 50 },
        data: {
          label: "Send Maintenance Alert",
          description: "Alert all users about upcoming maintenance",
          config: {
            type: "alert",
            priority: "critical",
            recipients: ["all_users"],
            channels: ["email", "in_app"],
          },
          inputs: [
            {
              id: "input",
              name: "Maintenance Required",
              type: "object",
              required: true,
            },
          ],
          outputs: [{ id: "output", name: "Alert Sent", type: "object" }],
        },
      },
      {
        id: "end_003",
        type: "end",
        position: { x: 1300, y: 100 },
        data: {
          label: "Workflow Complete",
          description: "Maintenance check workflow completed",
          config: { success: true },
          inputs: [{ id: "input", name: "Final Result", type: "object" }],
        },
      },
    ],
    connections: [
      {
        id: "conn_014",
        sourceNodeId: "start_003",
        targetNodeId: "data_002",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_015",
        sourceNodeId: "data_002",
        targetNodeId: "condition_003",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_016",
        sourceNodeId: "condition_003",
        targetNodeId: "notification_003",
        sourceHandle: "true",
        targetHandle: "input",
        label: "Maintenance Required",
      },
      {
        id: "conn_017",
        sourceNodeId: "condition_003",
        targetNodeId: "end_003",
        sourceHandle: "false",
        targetHandle: "input",
        label: "No Maintenance",
      },
      {
        id: "conn_018",
        sourceNodeId: "notification_003",
        targetNodeId: "end_003",
        sourceHandle: "output",
        targetHandle: "input",
      },
    ],
    variables: [
      {
        id: "var_005",
        name: "maintenanceRequired",
        type: "boolean",
        description: "Whether maintenance is required",
        scope: "execution",
      },
    ],
    settings: {
      autoSave: true,
      enableLogging: true,
      logLevel: "warn",
      maxExecutionTime: 600,
      maxConcurrentExecutions: 1,
      retryPolicy: {
        enabled: true,
        maxRetries: 1,
        retryDelay: 300,
        exponentialBackoff: false,
      },
      notifications: {
        onSuccess: false,
        onFailure: true,
        onTimeout: true,
        recipients: ["user_006"],
        channels: ["email"],
      },
      requireApproval: false,
      cacheResults: true,
      cacheTTL: 3600,
      enableMetrics: true,
      enableTracing: false,
      environment: "production",
    },
    visibility: "private",
    permissions: {
      canView: ["user_006"],
      canEdit: ["user_006"],
      canDelete: ["user_006"],
      canExecute: ["user_006"],
      canApprove: ["user_006"],
      canShare: ["user_006"],
      canCopy: ["user_006"],
      canExport: ["user_006"],
      canManagePermissions: ["user_006"],
    },
    createdBy: "user_006",
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
    executionCount: 12,
    successCount: 12,
    failureCount: 0,
    lastExecuted: "2024-01-25T07:45:00Z",
    averageExecutionTime: 120000, // 2 minutes
    isTemplate: false,
    tags: ["system", "maintenance", "alert"],
    folder: "System Management",
    publishedVersion: "1.0.0",
    draftChanges: false,
  },

  // Additional Workflows for BuildCorp Constructions (Construction)
  {
    id: "workflow_004",
    tenantId: "tenant_001",
    name: "Safety Incident Response",
    description: "Automated safety incident reporting and response workflow",
    category: "compliance",
    version: "1.0.0",
    status: "active",
    trigger: {
      type: "form_submission",
      config: {
        formId: "safety_incident_form",
        triggerOnSubmit: true,
      },
    },
    nodes: [
      {
        id: "start_004",
        type: "start",
        position: { x: 100, y: 100 },
        data: {
          label: "Safety Incident Reported",
          description: "Triggers when safety incident is reported",
          config: { triggerType: "form_submission" },
          outputs: [{ id: "output", name: "Incident Data", type: "object" }],
        },
      },
      {
        id: "notification_004",
        type: "notification",
        position: { x: 400, y: 100 },
        data: {
          label: "Alert Safety Team",
          description: "Immediately notify safety team and management",
          config: {
            templateId: "template_004",
            recipients: ["role:safety_officer", "role:site_manager"],
            channels: ["sms", "email", "in_app"],
            priority: "critical",
          },
          inputs: [
            {
              id: "input",
              name: "Incident Data",
              type: "object",
              required: true,
            },
          ],
          outputs: [{ id: "output", name: "Alert Sent", type: "object" }],
        },
      },
      {
        id: "condition_004",
        type: "condition",
        position: { x: 700, y: 100 },
        data: {
          label: "Severity Assessment",
          description: "Check if incident requires immediate response",
          config: {
            condition: "severity === 'critical' || injuries > 0",
            trueLabel: "Emergency Response",
            falseLabel: "Standard Process",
          },
          inputs: [
            { id: "input", name: "Alert Sent", type: "object", required: true },
          ],
          outputs: [
            { id: "true", name: "Emergency", type: "object" },
            { id: "false", name: "Standard", type: "object" },
          ],
        },
      },
      {
        id: "action_004",
        type: "action",
        position: { x: 1000, y: 50 },
        data: {
          label: "Emergency Protocol",
          description: "Activate emergency response protocols",
          config: {
            actionType: "emergency_protocol",
            parameters: {
              protocol: "site_emergency",
              escalate: true,
            },
          },
          inputs: [
            { id: "input", name: "Emergency", type: "object", required: true },
          ],
          outputs: [
            { id: "output", name: "Protocol Activated", type: "object" },
          ],
        },
      },
      {
        id: "end_004",
        type: "end",
        position: { x: 1300, y: 100 },
        data: {
          label: "Response Complete",
          description: "Safety incident response completed",
          config: { success: true },
          inputs: [{ id: "input", name: "Final Status", type: "object" }],
        },
      },
    ],
    connections: [
      {
        id: "conn_019",
        sourceNodeId: "start_004",
        targetNodeId: "notification_004",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_020",
        sourceNodeId: "notification_004",
        targetNodeId: "condition_004",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_021",
        sourceNodeId: "condition_004",
        targetNodeId: "action_004",
        sourceHandle: "true",
        targetHandle: "input",
        label: "Emergency",
      },
      {
        id: "conn_022",
        sourceNodeId: "condition_004",
        targetNodeId: "end_004",
        sourceHandle: "false",
        targetHandle: "input",
        label: "Standard",
      },
      {
        id: "conn_023",
        sourceNodeId: "action_004",
        targetNodeId: "end_004",
        sourceHandle: "output",
        targetHandle: "input",
      },
    ],
    variables: [
      {
        id: "var_006",
        name: "severity",
        type: "string",
        description: "Incident severity level",
        scope: "execution",
      },
      {
        id: "var_007",
        name: "injuries",
        type: "number",
        description: "Number of injuries",
        scope: "execution",
      },
    ],
    settings: {
      autoSave: true,
      enableLogging: true,
      logLevel: "info",
      maxExecutionTime: 1800,
      maxConcurrentExecutions: 5,
      retryPolicy: {
        enabled: true,
        maxRetries: 2,
        retryDelay: 60,
        exponentialBackoff: false,
      },
      notifications: {
        onSuccess: true,
        onFailure: true,
        onTimeout: true,
        recipients: ["user_001"],
        channels: ["email"],
      },
      requireApproval: false,
      cacheResults: false,
      cacheTTL: 0,
      enableMetrics: true,
      enableTracing: true,
      environment: "production",
    },
    visibility: "team",
    permissions: {
      canView: ["role:admin", "role:safety_officer", "role:site_manager"],
      canEdit: ["role:admin", "role:safety_officer"],
      canDelete: ["role:admin"],
      canExecute: ["all"],
      canApprove: ["role:admin"],
      canShare: ["role:admin"],
      canCopy: ["role:admin"],
      canExport: ["role:admin"],
      canManagePermissions: ["role:admin"],
    },
    createdBy: "user_001",
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
    executionCount: 8,
    successCount: 8,
    failureCount: 0,
    lastExecuted: "2024-01-23T14:30:00Z",
    averageExecutionTime: 180000, // 3 minutes
    isTemplate: false,
    tags: ["safety", "incident", "emergency", "compliance"],
    folder: "Safety Management",
    publishedVersion: "1.0.0",
    draftChanges: false,
  },

  {
    id: "workflow_005",
    tenantId: "tenant_001",
    name: "Material Request Approval",
    description: "Automated material request and procurement approval process",
    category: "operations",
    version: "1.1.0",
    status: "active",
    trigger: {
      type: "form_submission",
      config: {
        formId: "material_request_form",
        triggerOnSubmit: true,
      },
    },
    nodes: [
      {
        id: "start_005",
        type: "start",
        position: { x: 100, y: 100 },
        data: {
          label: "Material Request",
          description: "New material request submitted",
          config: { triggerType: "form_submission" },
          outputs: [{ id: "output", name: "Request Data", type: "object" }],
        },
      },
      {
        id: "condition_005",
        type: "condition",
        position: { x: 400, y: 100 },
        data: {
          label: "Budget Check",
          description: "Check if request exceeds budget limits",
          config: {
            condition: "totalCost > 50000",
            trueLabel: "Requires Approval",
            falseLabel: "Auto Approve",
          },
          inputs: [
            {
              id: "input",
              name: "Request Data",
              type: "object",
              required: true,
            },
          ],
          outputs: [
            { id: "true", name: "High Value", type: "object" },
            { id: "false", name: "Low Value", type: "object" },
          ],
        },
      },
      {
        id: "approval_005",
        type: "approval",
        position: { x: 700, y: 50 },
        data: {
          label: "Manager Approval",
          description: "Request manager approval for high-value items",
          config: {
            approvers: ["role:procurement_manager"],
            timeout: 172800000, // 48 hours
            reminderInterval: 28800000, // 8 hours
          },
          inputs: [
            { id: "input", name: "High Value", type: "object", required: true },
          ],
          outputs: [
            { id: "approved", name: "Approved", type: "object" },
            { id: "rejected", name: "Rejected", type: "object" },
            { id: "timeout", name: "Timeout", type: "object" },
          ],
        },
      },
      {
        id: "action_005",
        type: "action",
        position: { x: 700, y: 150 },
        data: {
          label: "Auto Process",
          description: "Automatically process low-value requests",
          config: {
            actionType: "create_purchase_order",
            parameters: {
              autoApprove: true,
              priority: "normal",
            },
          },
          inputs: [
            { id: "input", name: "Low Value", type: "object", required: true },
          ],
          outputs: [{ id: "output", name: "Order Created", type: "object" }],
        },
      },
      {
        id: "notification_005",
        type: "notification",
        position: { x: 1000, y: 100 },
        data: {
          label: "Notify Requestor",
          description: "Notify requestor of approval status",
          config: {
            templateId: "template_005",
            recipients: ["requestor"],
            channels: ["email", "in_app"],
            priority: "normal",
          },
          inputs: [
            {
              id: "input",
              name: "Final Status",
              type: "object",
              required: true,
            },
          ],
          outputs: [
            { id: "output", name: "Notification Sent", type: "object" },
          ],
        },
      },
      {
        id: "end_005",
        type: "end",
        position: { x: 1300, y: 100 },
        data: {
          label: "Process Complete",
          description: "Material request processing completed",
          config: { success: true },
          inputs: [{ id: "input", name: "Final Result", type: "object" }],
        },
      },
    ],
    connections: [
      {
        id: "conn_024",
        sourceNodeId: "start_005",
        targetNodeId: "condition_005",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_025",
        sourceNodeId: "condition_005",
        targetNodeId: "approval_005",
        sourceHandle: "true",
        targetHandle: "input",
        label: "High Value",
      },
      {
        id: "conn_026",
        sourceNodeId: "condition_005",
        targetNodeId: "action_005",
        sourceHandle: "false",
        targetHandle: "input",
        label: "Low Value",
      },
      {
        id: "conn_027",
        sourceNodeId: "approval_005",
        targetNodeId: "notification_005",
        sourceHandle: "approved",
        targetHandle: "input",
        label: "Approved",
      },
      {
        id: "conn_028",
        sourceNodeId: "action_005",
        targetNodeId: "notification_005",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_029",
        sourceNodeId: "notification_005",
        targetNodeId: "end_005",
        sourceHandle: "output",
        targetHandle: "input",
      },
    ],
    variables: [
      {
        id: "var_008",
        name: "totalCost",
        type: "number",
        description: "Total cost of materials",
        scope: "execution",
      },
      {
        id: "var_009",
        name: "requestor",
        type: "string",
        description: "User who made the request",
        scope: "execution",
      },
    ],
    settings: {
      autoSave: true,
      enableLogging: true,
      logLevel: "info",
      maxExecutionTime: 7200,
      maxConcurrentExecutions: 15,
      retryPolicy: {
        enabled: true,
        maxRetries: 3,
        retryDelay: 300,
        exponentialBackoff: true,
      },
      notifications: {
        onSuccess: false,
        onFailure: true,
        onTimeout: true,
        recipients: ["user_001"],
        channels: ["email"],
      },
      requireApproval: false,
      cacheResults: true,
      cacheTTL: 1800,
      enableMetrics: true,
      enableTracing: true,
      environment: "production",
    },
    visibility: "team",
    permissions: {
      canView: ["role:admin", "role:procurement_manager", "role:site_manager"],
      canEdit: ["role:admin", "role:procurement_manager"],
      canDelete: ["role:admin"],
      canExecute: ["all"],
      canApprove: ["role:admin"],
      canShare: ["role:admin"],
      canCopy: ["role:admin"],
      canExport: ["role:admin"],
      canManagePermissions: ["role:admin"],
    },
    createdBy: "user_001",
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    executionCount: 67,
    successCount: 64,
    failureCount: 3,
    lastExecuted: "2024-01-25T11:15:00Z",
    averageExecutionTime: 1800000, // 30 minutes
    isTemplate: false,
    tags: ["materials", "procurement", "approval", "budget"],
    folder: "Operations",
    publishedVersion: "1.1.0",
    draftChanges: false,
  },

  // Additional Workflows for Metro Realty Group (Real Estate)
  {
    id: "workflow_006",
    tenantId: "tenant_002",
    name: "Property Listing Workflow",
    description: "Automated property listing approval and marketing workflow",
    category: "crm",
    version: "2.0.0",
    status: "active",
    trigger: {
      type: "form_submission",
      config: {
        formId: "property_listing_form",
        triggerOnSubmit: true,
      },
    },
    nodes: [
      {
        id: "start_006",
        type: "start",
        position: { x: 100, y: 100 },
        data: {
          label: "Property Listed",
          description: "New property listing submitted",
          config: { triggerType: "form_submission" },
          outputs: [{ id: "output", name: "Property Data", type: "object" }],
        },
      },
      {
        id: "data_006",
        type: "data",
        position: { x: 400, y: 100 },
        data: {
          label: "Verify Property Details",
          description: "Validate property information and documents",
          config: {
            dataSource: "property_api",
            endpoint: "/property/verify",
            method: "POST",
          },
          inputs: [
            {
              id: "input",
              name: "Property Data",
              type: "object",
              required: true,
            },
          ],
          outputs: [
            { id: "output", name: "Verified Property", type: "object" },
          ],
        },
      },
      {
        id: "condition_006",
        type: "condition",
        position: { x: 700, y: 100 },
        data: {
          label: "Verification Status",
          description: "Check if property verification passed",
          config: {
            condition: "verification.status === 'passed'",
            trueLabel: "Verified",
            falseLabel: "Needs Review",
          },
          inputs: [
            {
              id: "input",
              name: "Verified Property",
              type: "object",
              required: true,
            },
          ],
          outputs: [
            { id: "true", name: "Verification Passed", type: "object" },
            { id: "false", name: "Verification Failed", type: "object" },
          ],
        },
      },
      {
        id: "action_006",
        type: "action",
        position: { x: 1000, y: 50 },
        data: {
          label: "Publish Listing",
          description: "Publish property to multiple listing platforms",
          config: {
            actionType: "publish_listing",
            parameters: {
              platforms: ["website", "mls", "social_media"],
              autoSchedule: true,
            },
          },
          inputs: [
            {
              id: "input",
              name: "Verification Passed",
              type: "object",
              required: true,
            },
          ],
          outputs: [{ id: "output", name: "Published", type: "object" }],
        },
      },
      {
        id: "approval_006",
        type: "approval",
        position: { x: 1000, y: 150 },
        data: {
          label: "Review Required",
          description: "Manual review required for failed verification",
          config: {
            approvers: ["role:listing_manager"],
            timeout: 259200000, // 72 hours
            reminderInterval: 43200000, // 12 hours
          },
          inputs: [
            {
              id: "input",
              name: "Verification Failed",
              type: "object",
              required: true,
            },
          ],
          outputs: [
            { id: "approved", name: "Approved", type: "object" },
            { id: "rejected", name: "Rejected", type: "object" },
            { id: "timeout", name: "Timeout", type: "object" },
          ],
        },
      },
      {
        id: "notification_006",
        type: "notification",
        position: { x: 1300, y: 100 },
        data: {
          label: "Notify Stakeholders",
          description: "Notify property owner and marketing team",
          config: {
            templateId: "template_006",
            recipients: ["property_owner", "role:marketing_team"],
            channels: ["email", "in_app"],
            priority: "normal",
          },
          inputs: [
            {
              id: "input",
              name: "Final Status",
              type: "object",
              required: true,
            },
          ],
          outputs: [
            { id: "output", name: "Notifications Sent", type: "object" },
          ],
        },
      },
      {
        id: "end_006",
        type: "end",
        position: { x: 1600, y: 100 },
        data: {
          label: "Listing Complete",
          description: "Property listing workflow completed",
          config: { success: true },
          inputs: [{ id: "input", name: "Final Result", type: "object" }],
        },
      },
    ],
    connections: [
      {
        id: "conn_030",
        sourceNodeId: "start_006",
        targetNodeId: "data_006",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_031",
        sourceNodeId: "data_006",
        targetNodeId: "condition_006",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_032",
        sourceNodeId: "condition_006",
        targetNodeId: "action_006",
        sourceHandle: "true",
        targetHandle: "input",
        label: "Verified",
      },
      {
        id: "conn_033",
        sourceNodeId: "condition_006",
        targetNodeId: "approval_006",
        sourceHandle: "false",
        targetHandle: "input",
        label: "Needs Review",
      },
      {
        id: "conn_034",
        sourceNodeId: "action_006",
        targetNodeId: "notification_006",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_035",
        sourceNodeId: "approval_006",
        targetNodeId: "notification_006",
        sourceHandle: "approved",
        targetHandle: "input",
        label: "Approved",
      },
      {
        id: "conn_036",
        sourceNodeId: "notification_006",
        targetNodeId: "end_006",
        sourceHandle: "output",
        targetHandle: "input",
      },
    ],
    variables: [
      {
        id: "var_010",
        name: "propertyId",
        type: "string",
        description: "Unique property identifier",
        scope: "execution",
      },
      {
        id: "var_011",
        name: "propertyOwner",
        type: "string",
        description: "Property owner contact",
        scope: "execution",
      },
    ],
    settings: {
      autoSave: true,
      enableLogging: true,
      logLevel: "info",
      maxExecutionTime: 3600,
      maxConcurrentExecutions: 25,
      retryPolicy: {
        enabled: true,
        maxRetries: 2,
        retryDelay: 120,
        exponentialBackoff: true,
      },
      notifications: {
        onSuccess: true,
        onFailure: true,
        onTimeout: true,
        recipients: ["user_004"],
        channels: ["email"],
      },
      requireApproval: false,
      cacheResults: true,
      cacheTTL: 3600,
      enableMetrics: true,
      enableTracing: true,
      environment: "production",
    },
    visibility: "team",
    permissions: {
      canView: ["role:admin", "role:listing_manager", "role:sales_agent"],
      canEdit: ["role:admin", "role:listing_manager"],
      canDelete: ["role:admin"],
      canExecute: ["all"],
      canApprove: ["role:admin"],
      canShare: ["role:admin"],
      canCopy: ["role:admin"],
      canExport: ["role:admin"],
      canManagePermissions: ["role:admin"],
    },
    createdBy: "user_004",
    createdAt: "2024-02-05T00:00:00Z",
    updatedAt: "2024-02-10T00:00:00Z",
    executionCount: 89,
    successCount: 85,
    failureCount: 4,
    lastExecuted: "2024-01-25T16:20:00Z",
    averageExecutionTime: 900000, // 15 minutes
    isTemplate: false,
    tags: ["property", "listing", "marketing", "verification"],
    folder: "Property Management",
    publishedVersion: "2.0.0",
    draftChanges: false,
  },

  {
    id: "workflow_007",
    tenantId: "tenant_002",
    name: "Client Onboarding",
    description: "Automated client onboarding and document collection workflow",
    category: "crm",
    version: "1.3.0",
    status: "active",
    trigger: {
      type: "form_submission",
      config: {
        formId: "client_registration_form",
        triggerOnSubmit: true,
      },
    },
    nodes: [
      {
        id: "start_007",
        type: "start",
        position: { x: 100, y: 100 },
        data: {
          label: "Client Registration",
          description: "New client registration received",
          config: { triggerType: "form_submission" },
          outputs: [{ id: "output", name: "Client Data", type: "object" }],
        },
      },
      {
        id: "notification_007",
        type: "notification",
        position: { x: 400, y: 100 },
        data: {
          label: "Welcome Email",
          description: "Send welcome email with onboarding instructions",
          config: {
            templateId: "template_007",
            recipients: ["client"],
            channels: ["email"],
            priority: "normal",
          },
          inputs: [
            {
              id: "input",
              name: "Client Data",
              type: "object",
              required: true,
            },
          ],
          outputs: [{ id: "output", name: "Welcome Sent", type: "object" }],
        },
      },
      {
        id: "delay_007",
        type: "delay",
        position: { x: 700, y: 100 },
        data: {
          label: "Wait 24 Hours",
          description: "Wait for client to upload documents",
          config: {
            duration: 86400000, // 24 hours
            unit: "hours",
          },
          inputs: [
            {
              id: "input",
              name: "Welcome Sent",
              type: "object",
              required: true,
            },
          ],
          outputs: [{ id: "output", name: "Wait Complete", type: "object" }],
        },
      },
      {
        id: "data_007",
        type: "data",
        position: { x: 1000, y: 100 },
        data: {
          label: "Check Documents",
          description: "Check if all required documents are uploaded",
          config: {
            dataSource: "client_api",
            endpoint: "/client/documents/status",
            method: "GET",
          },
          inputs: [
            {
              id: "input",
              name: "Wait Complete",
              type: "object",
              required: true,
            },
          ],
          outputs: [{ id: "output", name: "Document Status", type: "object" }],
        },
      },
      {
        id: "condition_007",
        type: "condition",
        position: { x: 1300, y: 100 },
        data: {
          label: "Documents Complete?",
          description: "Check if all required documents are uploaded",
          config: {
            condition: "documentsComplete === true",
            trueLabel: "All Documents",
            falseLabel: "Missing Documents",
          },
          inputs: [
            {
              id: "input",
              name: "Document Status",
              type: "object",
              required: true,
            },
          ],
          outputs: [
            { id: "true", name: "Complete", type: "object" },
            { id: "false", name: "Incomplete", type: "object" },
          ],
        },
      },
      {
        id: "action_007",
        type: "action",
        position: { x: 1600, y: 50 },
        data: {
          label: "Complete Onboarding",
          description:
            "Activate client account and assign relationship manager",
          config: {
            actionType: "complete_onboarding",
            parameters: {
              activateAccount: true,
              assignRM: true,
            },
          },
          inputs: [
            { id: "input", name: "Complete", type: "object", required: true },
          ],
          outputs: [
            { id: "output", name: "Onboarding Complete", type: "object" },
          ],
        },
      },
      {
        id: "notification_008",
        type: "notification",
        position: { x: 1600, y: 150 },
        data: {
          label: "Reminder Email",
          description: "Send reminder about missing documents",
          config: {
            templateId: "template_008",
            recipients: ["client"],
            channels: ["email", "sms"],
            priority: "high",
          },
          inputs: [
            { id: "input", name: "Incomplete", type: "object", required: true },
          ],
          outputs: [{ id: "output", name: "Reminder Sent", type: "object" }],
        },
      },
      {
        id: "end_007",
        type: "end",
        position: { x: 1900, y: 100 },
        data: {
          label: "Onboarding Complete",
          description: "Client onboarding workflow finished",
          config: { success: true },
          inputs: [{ id: "input", name: "Final Status", type: "object" }],
        },
      },
    ],
    connections: [
      {
        id: "conn_037",
        sourceNodeId: "start_007",
        targetNodeId: "notification_007",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_038",
        sourceNodeId: "notification_007",
        targetNodeId: "delay_007",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_039",
        sourceNodeId: "delay_007",
        targetNodeId: "data_007",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_040",
        sourceNodeId: "data_007",
        targetNodeId: "condition_007",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_041",
        sourceNodeId: "condition_007",
        targetNodeId: "action_007",
        sourceHandle: "true",
        targetHandle: "input",
        label: "Complete",
      },
      {
        id: "conn_042",
        sourceNodeId: "condition_007",
        targetNodeId: "notification_008",
        sourceHandle: "false",
        targetHandle: "input",
        label: "Incomplete",
      },
      {
        id: "conn_043",
        sourceNodeId: "action_007",
        targetNodeId: "end_007",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_044",
        sourceNodeId: "notification_008",
        targetNodeId: "end_007",
        sourceHandle: "output",
        targetHandle: "input",
      },
    ],
    variables: [
      {
        id: "var_012",
        name: "clientId",
        type: "string",
        description: "Unique client identifier",
        scope: "execution",
      },
      {
        id: "var_013",
        name: "documentsComplete",
        type: "boolean",
        description: "Whether all documents are uploaded",
        scope: "execution",
      },
    ],
    settings: {
      autoSave: true,
      enableLogging: true,
      logLevel: "info",
      maxExecutionTime: 7200,
      maxConcurrentExecutions: 20,
      retryPolicy: {
        enabled: true,
        maxRetries: 3,
        retryDelay: 300,
        exponentialBackoff: true,
      },
      notifications: {
        onSuccess: true,
        onFailure: true,
        onTimeout: true,
        recipients: ["user_004"],
        channels: ["email"],
      },
      requireApproval: false,
      cacheResults: false,
      cacheTTL: 0,
      enableMetrics: true,
      enableTracing: true,
      environment: "production",
    },
    visibility: "team",
    permissions: {
      canView: ["role:admin", "role:relationship_manager", "role:operations"],
      canEdit: ["role:admin", "role:operations"],
      canDelete: ["role:admin"],
      canExecute: ["all"],
      canApprove: ["role:admin"],
      canShare: ["role:admin"],
      canCopy: ["role:admin"],
      canExport: ["role:admin"],
      canManagePermissions: ["role:admin"],
    },
    createdBy: "user_004",
    createdAt: "2024-02-08T00:00:00Z",
    updatedAt: "2024-02-12T00:00:00Z",
    executionCount: 156,
    successCount: 148,
    failureCount: 8,
    lastExecuted: "2024-01-25T13:45:00Z",
    averageExecutionTime: 2700000, // 45 minutes
    isTemplate: false,
    tags: ["client", "onboarding", "documents", "kyc"],
    folder: "Client Management",
    publishedVersion: "1.3.0",
    draftChanges: false,
  },

  // Additional Workflows for Skyline Developers (Development)
  {
    id: "workflow_008",
    tenantId: "tenant_003",
    name: "Permit Application Process",
    description: "Automated building permit application and tracking workflow",
    category: "compliance",
    version: "1.2.0",
    status: "active",
    trigger: {
      type: "form_submission",
      config: {
        formId: "permit_application_form",
        triggerOnSubmit: true,
      },
    },
    nodes: [
      {
        id: "start_008",
        type: "start",
        position: { x: 100, y: 100 },
        data: {
          label: "Permit Application",
          description: "New permit application submitted",
          config: { triggerType: "form_submission" },
          outputs: [{ id: "output", name: "Application Data", type: "object" }],
        },
      },
      {
        id: "data_008",
        type: "data",
        position: { x: 400, y: 100 },
        data: {
          label: "Validate Application",
          description: "Validate application completeness and requirements",
          config: {
            dataSource: "permit_api",
            endpoint: "/permit/validate",
            method: "POST",
          },
          inputs: [
            {
              id: "input",
              name: "Application Data",
              type: "object",
              required: true,
            },
          ],
          outputs: [
            { id: "output", name: "Validation Result", type: "object" },
          ],
        },
      },
      {
        id: "condition_008",
        type: "condition",
        position: { x: 700, y: 100 },
        data: {
          label: "Application Valid?",
          description: "Check if application passes validation",
          config: {
            condition: "validation.isValid === true",
            trueLabel: "Valid",
            falseLabel: "Invalid",
          },
          inputs: [
            {
              id: "input",
              name: "Validation Result",
              type: "object",
              required: true,
            },
          ],
          outputs: [
            { id: "true", name: "Valid Application", type: "object" },
            { id: "false", name: "Invalid Application", type: "object" },
          ],
        },
      },
      {
        id: "action_008",
        type: "action",
        position: { x: 1000, y: 50 },
        data: {
          label: "Submit to Authority",
          description: "Submit valid application to regulatory authority",
          config: {
            actionType: "submit_permit",
            parameters: {
              authority: "city_planning",
              trackingEnabled: true,
            },
          },
          inputs: [
            {
              id: "input",
              name: "Valid Application",
              type: "object",
              required: true,
            },
          ],
          outputs: [{ id: "output", name: "Submitted", type: "object" }],
        },
      },
      {
        id: "notification_009",
        type: "notification",
        position: { x: 1000, y: 150 },
        data: {
          label: "Rejection Notice",
          description: "Notify applicant of validation issues",
          config: {
            templateId: "template_009",
            recipients: ["applicant"],
            channels: ["email", "in_app"],
            priority: "high",
          },
          inputs: [
            {
              id: "input",
              name: "Invalid Application",
              type: "object",
              required: true,
            },
          ],
          outputs: [{ id: "output", name: "Notice Sent", type: "object" }],
        },
      },
      {
        id: "delay_008",
        type: "delay",
        position: { x: 1300, y: 50 },
        data: {
          label: "Wait for Response",
          description: "Wait for authority response (30 days)",
          config: {
            duration: 2592000000, // 30 days
            unit: "days",
          },
          inputs: [
            { id: "input", name: "Submitted", type: "object", required: true },
          ],
          outputs: [{ id: "output", name: "Wait Complete", type: "object" }],
        },
      },
      {
        id: "data_009",
        type: "data",
        position: { x: 1600, y: 50 },
        data: {
          label: "Check Status",
          description: "Check permit application status",
          config: {
            dataSource: "permit_api",
            endpoint: "/permit/status",
            method: "GET",
          },
          inputs: [
            {
              id: "input",
              name: "Wait Complete",
              type: "object",
              required: true,
            },
          ],
          outputs: [{ id: "output", name: "Status Result", type: "object" }],
        },
      },
      {
        id: "notification_010",
        type: "notification",
        position: { x: 1900, y: 50 },
        data: {
          label: "Status Update",
          description: "Notify applicant of permit status",
          config: {
            templateId: "template_010",
            recipients: ["applicant", "role:project_manager"],
            channels: ["email", "in_app"],
            priority: "normal",
          },
          inputs: [
            {
              id: "input",
              name: "Status Result",
              type: "object",
              required: true,
            },
          ],
          outputs: [{ id: "output", name: "Update Sent", type: "object" }],
        },
      },
      {
        id: "end_008",
        type: "end",
        position: { x: 2200, y: 100 },
        data: {
          label: "Process Complete",
          description: "Permit application process completed",
          config: { success: true },
          inputs: [{ id: "input", name: "Final Status", type: "object" }],
        },
      },
    ],
    connections: [
      {
        id: "conn_045",
        sourceNodeId: "start_008",
        targetNodeId: "data_008",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_046",
        sourceNodeId: "data_008",
        targetNodeId: "condition_008",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_047",
        sourceNodeId: "condition_008",
        targetNodeId: "action_008",
        sourceHandle: "true",
        targetHandle: "input",
        label: "Valid",
      },
      {
        id: "conn_048",
        sourceNodeId: "condition_008",
        targetNodeId: "notification_009",
        sourceHandle: "false",
        targetHandle: "input",
        label: "Invalid",
      },
      {
        id: "conn_049",
        sourceNodeId: "action_008",
        targetNodeId: "delay_008",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_050",
        sourceNodeId: "delay_008",
        targetNodeId: "data_009",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_051",
        sourceNodeId: "data_009",
        targetNodeId: "notification_010",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_052",
        sourceNodeId: "notification_009",
        targetNodeId: "end_008",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_053",
        sourceNodeId: "notification_010",
        targetNodeId: "end_008",
        sourceHandle: "output",
        targetHandle: "input",
      },
    ],
    variables: [
      {
        id: "var_014",
        name: "applicationId",
        type: "string",
        description: "Permit application ID",
        scope: "execution",
      },
      {
        id: "var_015",
        name: "applicant",
        type: "string",
        description: "Applicant contact information",
        scope: "execution",
      },
    ],
    settings: {
      autoSave: true,
      enableLogging: true,
      logLevel: "info",
      maxExecutionTime: 2678400, // 31 days
      maxConcurrentExecutions: 10,
      retryPolicy: {
        enabled: true,
        maxRetries: 2,
        retryDelay: 3600,
        exponentialBackoff: false,
      },
      notifications: {
        onSuccess: true,
        onFailure: true,
        onTimeout: true,
        recipients: ["user_006"],
        channels: ["email"],
      },
      requireApproval: false,
      cacheResults: true,
      cacheTTL: 86400,
      enableMetrics: true,
      enableTracing: true,
      environment: "production",
    },
    visibility: "team",
    permissions: {
      canView: [
        "role:admin",
        "role:project_manager",
        "role:compliance_officer",
      ],
      canEdit: ["role:admin", "role:compliance_officer"],
      canDelete: ["role:admin"],
      canExecute: ["all"],
      canApprove: ["role:admin"],
      canShare: ["role:admin"],
      canCopy: ["role:admin"],
      canExport: ["role:admin"],
      canManagePermissions: ["role:admin"],
    },
    createdBy: "user_006",
    createdAt: "2024-03-02T00:00:00Z",
    updatedAt: "2024-03-05T00:00:00Z",
    executionCount: 23,
    successCount: 21,
    failureCount: 2,
    lastExecuted: "2024-01-24T10:30:00Z",
    averageExecutionTime: 86400000, // 24 hours (due to delays)
    isTemplate: false,
    tags: ["permit", "compliance", "authority", "tracking"],
    folder: "Compliance",
    publishedVersion: "1.2.0",
    draftChanges: false,
  },

  {
    id: "workflow_009",
    tenantId: "tenant_003",
    name: "Quality Assurance Checklist",
    description:
      "Automated QA checklist and inspection workflow for development projects",
    category: "operations",
    version: "1.0.0",
    status: "active",
    trigger: {
      type: "schedule",
      config: {
        scheduleType: "recurring",
      },
      schedule: {
        type: "recurring",
        timezone: "Asia/Kolkata",
        recurrence: {
          frequency: "weekly",
          interval: 2, // Every 2 weeks
          daysOfWeek: [2], // Tuesday
        },
      },
    },
    nodes: [
      {
        id: "start_009",
        type: "start",
        position: { x: 100, y: 100 },
        data: {
          label: "QA Schedule Trigger",
          description: "Runs every 2 weeks on Tuesday",
          config: { triggerType: "schedule" },
          outputs: [{ id: "output", name: "Trigger Data", type: "object" }],
        },
      },
      {
        id: "data_010",
        type: "data",
        position: { x: 400, y: 100 },
        data: {
          label: "Get Active Projects",
          description: "Retrieve list of active development projects",
          config: {
            dataSource: "project_api",
            endpoint: "/projects/active",
            method: "GET",
          },
          inputs: [
            {
              id: "input",
              name: "Trigger Data",
              type: "object",
              required: true,
            },
          ],
          outputs: [{ id: "output", name: "Project List", type: "object" }],
        },
      },
      {
        id: "action_009",
        type: "action",
        position: { x: 700, y: 100 },
        data: {
          label: "Generate QA Checklists",
          description: "Create QA checklists for each active project",
          config: {
            actionType: "generate_checklists",
            parameters: {
              templateType: "qa_standard",
              assignToQATeam: true,
            },
          },
          inputs: [
            {
              id: "input",
              name: "Project List",
              type: "object",
              required: true,
            },
          ],
          outputs: [
            { id: "output", name: "Checklists Created", type: "object" },
          ],
        },
      },
      {
        id: "notification_011",
        type: "notification",
        position: { x: 1000, y: 100 },
        data: {
          label: "Notify QA Team",
          description: "Notify QA team of new inspection tasks",
          config: {
            templateId: "template_011",
            recipients: ["role:qa_team", "role:site_supervisor"],
            channels: ["email", "in_app"],
            priority: "normal",
          },
          inputs: [
            {
              id: "input",
              name: "Checklists Created",
              type: "object",
              required: true,
            },
          ],
          outputs: [{ id: "output", name: "Team Notified", type: "object" }],
        },
      },
      {
        id: "delay_009",
        type: "delay",
        position: { x: 1300, y: 100 },
        data: {
          label: "Wait 48 Hours",
          description: "Give time for QA inspections to be completed",
          config: {
            duration: 172800000, // 48 hours
            unit: "hours",
          },
          inputs: [
            {
              id: "input",
              name: "Team Notified",
              type: "object",
              required: true,
            },
          ],
          outputs: [{ id: "output", name: "Wait Complete", type: "object" }],
        },
      },
      {
        id: "data_011",
        type: "data",
        position: { x: 1600, y: 100 },
        data: {
          label: "Check Completion",
          description: "Check QA checklist completion status",
          config: {
            dataSource: "qa_api",
            endpoint: "/qa/checklists/status",
            method: "GET",
          },
          inputs: [
            {
              id: "input",
              name: "Wait Complete",
              type: "object",
              required: true,
            },
          ],
          outputs: [
            { id: "output", name: "Completion Status", type: "object" },
          ],
        },
      },
      {
        id: "condition_009",
        type: "condition",
        position: { x: 1900, y: 100 },
        data: {
          label: "All Complete?",
          description: "Check if all QA checklists are completed",
          config: {
            condition: "completionRate >= 0.9", // 90% completion rate
            trueLabel: "Mostly Complete",
            falseLabel: "Incomplete",
          },
          inputs: [
            {
              id: "input",
              name: "Completion Status",
              type: "object",
              required: true,
            },
          ],
          outputs: [
            { id: "true", name: "Complete", type: "object" },
            { id: "false", name: "Incomplete", type: "object" },
          ],
        },
      },
      {
        id: "notification_012",
        type: "notification",
        position: { x: 2200, y: 50 },
        data: {
          label: "QA Summary Report",
          description: "Send QA completion summary to management",
          config: {
            templateId: "template_012",
            recipients: ["role:project_manager", "role:qa_director"],
            channels: ["email"],
            priority: "normal",
          },
          inputs: [
            { id: "input", name: "Complete", type: "object", required: true },
          ],
          outputs: [{ id: "output", name: "Report Sent", type: "object" }],
        },
      },
      {
        id: "notification_013",
        type: "notification",
        position: { x: 2200, y: 150 },
        data: {
          label: "Overdue Alert",
          description: "Alert about incomplete QA checklists",
          config: {
            templateId: "template_013",
            recipients: ["role:qa_team", "role:project_manager"],
            channels: ["email", "sms"],
            priority: "urgent",
          },
          inputs: [
            { id: "input", name: "Incomplete", type: "object", required: true },
          ],
          outputs: [{ id: "output", name: "Alert Sent", type: "object" }],
        },
      },
      {
        id: "end_009",
        type: "end",
        position: { x: 2500, y: 100 },
        data: {
          label: "QA Cycle Complete",
          description: "QA checklist workflow completed",
          config: { success: true },
          inputs: [{ id: "input", name: "Final Status", type: "object" }],
        },
      },
    ],
    connections: [
      {
        id: "conn_054",
        sourceNodeId: "start_009",
        targetNodeId: "data_010",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_055",
        sourceNodeId: "data_010",
        targetNodeId: "action_009",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_056",
        sourceNodeId: "action_009",
        targetNodeId: "notification_011",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_057",
        sourceNodeId: "notification_011",
        targetNodeId: "delay_009",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_058",
        sourceNodeId: "delay_009",
        targetNodeId: "data_011",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_059",
        sourceNodeId: "data_011",
        targetNodeId: "condition_009",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_060",
        sourceNodeId: "condition_009",
        targetNodeId: "notification_012",
        sourceHandle: "true",
        targetHandle: "input",
        label: "Complete",
      },
      {
        id: "conn_061",
        sourceNodeId: "condition_009",
        targetNodeId: "notification_013",
        sourceHandle: "false",
        targetHandle: "input",
        label: "Incomplete",
      },
      {
        id: "conn_062",
        sourceNodeId: "notification_012",
        targetNodeId: "end_009",
        sourceHandle: "output",
        targetHandle: "input",
      },
      {
        id: "conn_063",
        sourceNodeId: "notification_013",
        targetNodeId: "end_009",
        sourceHandle: "output",
        targetHandle: "input",
      },
    ],
    variables: [
      {
        id: "var_016",
        name: "completionRate",
        type: "number",
        description: "QA checklist completion percentage",
        scope: "execution",
      },
      {
        id: "var_017",
        name: "activeProjects",
        type: "array",
        description: "List of active projects",
        scope: "execution",
      },
    ],
    settings: {
      autoSave: true,
      enableLogging: true,
      logLevel: "info",
      maxExecutionTime: 7200,
      maxConcurrentExecutions: 1,
      retryPolicy: {
        enabled: true,
        maxRetries: 2,
        retryDelay: 300,
        exponentialBackoff: true,
      },
      notifications: {
        onSuccess: true,
        onFailure: true,
        onTimeout: true,
        recipients: ["user_006"],
        channels: ["email"],
      },
      requireApproval: false,
      cacheResults: true,
      cacheTTL: 3600,
      enableMetrics: true,
      enableTracing: true,
      environment: "production",
    },
    visibility: "team",
    permissions: {
      canView: ["role:admin", "role:qa_team", "role:project_manager"],
      canEdit: ["role:admin", "role:qa_director"],
      canDelete: ["role:admin"],
      canExecute: ["role:admin", "role:qa_director"],
      canApprove: ["role:admin"],
      canShare: ["role:admin"],
      canCopy: ["role:admin"],
      canExport: ["role:admin"],
      canManagePermissions: ["role:admin"],
    },
    createdBy: "user_006",
    createdAt: "2024-03-08T00:00:00Z",
    updatedAt: "2024-03-08T00:00:00Z",
    executionCount: 6,
    successCount: 6,
    failureCount: 0,
    lastExecuted: "2024-01-23T09:00:00Z",
    averageExecutionTime: 7200000, // 2 hours
    isTemplate: false,
    tags: ["qa", "quality", "inspection", "checklist"],
    folder: "Quality Management",
    publishedVersion: "1.0.0",
    draftChanges: false,
  },
];

// Helper functions for tenant-specific data retrieval
export const getTenantWorkflows = (tenantId: string): TenantWorkflow[] => {
  return mockWorkflows.filter((workflow) => workflow.tenantId === tenantId);
};

export const getWorkflowById = (
  workflowId: string,
): TenantWorkflow | undefined => {
  return mockWorkflows.find((workflow) => workflow.id === workflowId);
};

export const getWorkflowsByCategory = (
  tenantId: string,
  category: WorkflowCategory,
): TenantWorkflow[] => {
  return mockWorkflows.filter(
    (workflow) =>
      workflow.tenantId === tenantId && workflow.category === category,
  );
};

export const getActiveWorkflows = (tenantId: string): TenantWorkflow[] => {
  return mockWorkflows.filter(
    (workflow) =>
      workflow.tenantId === tenantId && workflow.status === "active",
  );
};

// Node templates for workflow builder
export const nodeTemplates: NodeTemplate[] = [
  {
    type: "start",
    label: "Start",
    description: "Starting point of the workflow",
    icon: "play-circle",
    category: "trigger",
    tags: ["start", "trigger"],
    defaultData: {
      label: "Start",
      description: "Workflow starts here",
      config: {},
      outputs: [{ id: "output", name: "Start", type: "object" }],
    },
    configSchema: [
      {
        key: "label",
        label: "Label",
        type: "text",
        required: true,
        placeholder: "Enter node label",
      },
      {
        key: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Describe what this node does",
      },
    ],
    supportsRetry: false,
    supportsAsync: false,
    supportsConditionals: false,
  },
  {
    type: "notification",
    label: "Notification",
    description: "Send notifications via various channels",
    icon: "bell",
    category: "communication",
    tags: ["notification", "email", "sms"],
    defaultData: {
      label: "Send Notification",
      description: "Send notification to recipients",
      config: {
        templateId: "",
        recipients: [],
        channels: ["email"],
        priority: "normal",
      },
      inputs: [{ id: "input", name: "Data", type: "object", required: true }],
      outputs: [{ id: "output", name: "Result", type: "object" }],
    },
    configSchema: [
      {
        key: "templateId",
        label: "Template",
        type: "select",
        options: [
          { label: "Project Approval", value: "template_001" },
          { label: "Lead Assignment", value: "template_002" },
          { label: "Safety Reminder", value: "template_003" },
        ],
      },
      {
        key: "priority",
        label: "Priority",
        type: "select",
        defaultValue: "normal",
        options: [
          { label: "Low", value: "low" },
          { label: "Normal", value: "normal" },
          { label: "High", value: "high" },
          { label: "Urgent", value: "urgent" },
          { label: "Critical", value: "critical" },
        ],
      },
      {
        key: "channels",
        label: "Channels",
        type: "multiselect",
        options: [
          { label: "Email", value: "email" },
          { label: "SMS", value: "sms" },
          { label: "In-App", value: "in_app" },
          { label: "WhatsApp", value: "whatsapp" },
          { label: "Push", value: "push" },
        ],
      },
    ],
    supportsRetry: true,
    supportsAsync: true,
    supportsConditionals: false,
  },
  {
    type: "approval",
    label: "Approval",
    description: "Wait for approval from specified users",
    icon: "check-circle",
    category: "decision",
    tags: ["approval", "decision", "wait"],
    defaultData: {
      label: "Approval Required",
      description: "Wait for approval",
      config: {
        approvers: [],
        timeout: 86400000, // 24 hours
        reminderInterval: 14400000, // 4 hours
      },
      inputs: [{ id: "input", name: "Data", type: "object", required: true }],
      outputs: [
        { id: "approved", name: "Approved", type: "object" },
        { id: "rejected", name: "Rejected", type: "object" },
        { id: "timeout", name: "Timeout", type: "object" },
      ],
    },
    configSchema: [
      {
        key: "approvers",
        label: "Approvers",
        type: "multiselect",
        required: true,
        options: [
          { label: "Project Managers", value: "role:project_manager" },
          { label: "Administrators", value: "role:admin" },
          { label: "Department Heads", value: "role:department_head" },
        ],
      },
      {
        key: "timeout",
        label: "Timeout (hours)",
        type: "number",
        defaultValue: 24,
        validation: { min: 1, max: 720 },
      },
      {
        key: "reminderInterval",
        label: "Reminder Interval (hours)",
        type: "number",
        defaultValue: 4,
        validation: { min: 1, max: 24 },
      },
    ],
    supportsRetry: false,
    supportsAsync: true,
    supportsConditionals: false,
  },
  {
    type: "condition",
    label: "Condition",
    description: "Branch workflow based on conditions",
    icon: "git-branch",
    category: "logic",
    tags: ["condition", "branch", "logic"],
    defaultData: {
      label: "Condition Check",
      description: "Evaluate condition and branch",
      config: {
        condition: "",
        trueLabel: "True",
        falseLabel: "False",
      },
      inputs: [{ id: "input", name: "Data", type: "object", required: true }],
      outputs: [
        { id: "true", name: "True", type: "object" },
        { id: "false", name: "False", type: "object" },
      ],
    },
    configSchema: [
      {
        key: "condition",
        label: "Condition",
        type: "code",
        language: "javascript",
        required: true,
        placeholder: "e.g., amount > 1000",
        description: "JavaScript expression to evaluate",
      },
      {
        key: "trueLabel",
        label: "True Branch Label",
        type: "text",
        defaultValue: "True",
      },
      {
        key: "falseLabel",
        label: "False Branch Label",
        type: "text",
        defaultValue: "False",
      },
    ],
    supportsRetry: false,
    supportsAsync: false,
    supportsConditionals: true,
  },
  {
    type: "action",
    label: "Action",
    description: "Perform an action or operation",
    icon: "zap",
    category: "action",
    tags: ["action", "operation", "execute"],
    defaultData: {
      label: "Action",
      description: "Perform an action",
      config: {
        actionType: "custom",
        parameters: {},
      },
      inputs: [{ id: "input", name: "Data", type: "object", required: true }],
      outputs: [{ id: "output", name: "Result", type: "object" }],
    },
    configSchema: [
      {
        key: "actionType",
        label: "Action Type",
        type: "select",
        required: true,
        options: [
          { label: "Update Status", value: "update_status" },
          { label: "Send Email", value: "send_email" },
          { label: "Create Record", value: "create_record" },
          { label: "Custom Script", value: "custom_script" },
        ],
      },
      {
        key: "parameters",
        label: "Parameters",
        type: "json",
        placeholder: "{}",
        description: "Action-specific parameters",
      },
    ],
    supportsRetry: true,
    supportsAsync: true,
    supportsConditionals: false,
  },
  {
    type: "data",
    label: "Data",
    description: "Fetch or transform data",
    icon: "database",
    category: "data",
    tags: ["data", "fetch", "transform"],
    defaultData: {
      label: "Data Operation",
      description: "Fetch or transform data",
      config: {
        dataSource: "api",
        endpoint: "",
        method: "GET",
      },
      inputs: [{ id: "input", name: "Input", type: "object", required: true }],
      outputs: [{ id: "output", name: "Output", type: "object" }],
    },
    configSchema: [
      {
        key: "dataSource",
        label: "Data Source",
        type: "select",
        required: true,
        options: [
          { label: "API Endpoint", value: "api" },
          { label: "Database Query", value: "database" },
          { label: "File System", value: "file" },
          { label: "Transform", value: "transform" },
        ],
      },
      {
        key: "endpoint",
        label: "Endpoint/Query",
        type: "text",
        placeholder: "/api/data",
        dependsOn: { field: "dataSource", value: "api" },
      },
      {
        key: "method",
        label: "HTTP Method",
        type: "select",
        options: [
          { label: "GET", value: "GET" },
          { label: "POST", value: "POST" },
          { label: "PUT", value: "PUT" },
          { label: "DELETE", value: "DELETE" },
        ],
        dependsOn: { field: "dataSource", value: "api" },
      },
    ],
    supportsRetry: true,
    supportsAsync: true,
    supportsConditionals: false,
  },
  {
    type: "delay",
    label: "Delay",
    description: "Wait for a specified duration",
    icon: "clock",
    category: "utility",
    tags: ["delay", "wait", "pause"],
    defaultData: {
      label: "Delay",
      description: "Wait for specified time",
      config: {
        duration: 60000, // 1 minute
        unit: "minutes",
      },
      inputs: [{ id: "input", name: "Input", type: "object", required: true }],
      outputs: [{ id: "output", name: "Output", type: "object" }],
    },
    configSchema: [
      {
        key: "duration",
        label: "Duration",
        type: "number",
        required: true,
        defaultValue: 1,
        validation: { min: 1 },
      },
      {
        key: "unit",
        label: "Unit",
        type: "select",
        defaultValue: "minutes",
        options: [
          { label: "Seconds", value: "seconds" },
          { label: "Minutes", value: "minutes" },
          { label: "Hours", value: "hours" },
          { label: "Days", value: "days" },
        ],
      },
    ],
    supportsRetry: false,
    supportsAsync: true,
    supportsConditionals: false,
  },
  {
    type: "end",
    label: "End",
    description: "End point of the workflow",
    icon: "stop-circle",
    category: "trigger",
    tags: ["end", "finish", "complete"],
    defaultData: {
      label: "End",
      description: "Workflow ends here",
      config: {
        success: true,
      },
      inputs: [{ id: "input", name: "Input", type: "object" }],
    },
    configSchema: [
      {
        key: "success",
        label: "Success",
        type: "checkbox",
        defaultValue: true,
        description: "Mark workflow as successful",
      },
      {
        key: "message",
        label: "Completion Message",
        type: "text",
        placeholder: "Workflow completed successfully",
      },
    ],
    supportsRetry: false,
    supportsAsync: false,
    supportsConditionals: false,
  },
];

// Export all for easier access
export default {
  mockWorkflows,
  nodeTemplates,
  getTenantWorkflows,
  getWorkflowById,
  getWorkflowsByCategory,
  getActiveWorkflows,
};
