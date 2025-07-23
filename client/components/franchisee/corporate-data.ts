import {
  CorporateUser,
  CorporateRole,
  WorkflowAssignment,
  WorkflowAction,
  BackgroundVerification,
  Notification,
  AuditLog,
  CorporateDashboard,
  WorkflowComment,
  NotificationRule,
  EscalationRule,
  WorkflowAnalytics,
} from "./corporate-types";

// Mock Corporate Roles
export const mockCorporateRoles: CorporateRole[] = [
  {
    id: "role_regional_manager",
    name: "Regional Manager",
    level: 1,
    description: "Manages franchisee applications for specific regions",
    canApprove: true,
    canAssign: true,
    canReject: true,
    maxApprovalAmount: 2500000, // 25 Lakhs
    regions: ["Maharashtra", "Gujarat"],
  },
  {
    id: "role_area_head",
    name: "Area Head",
    level: 2,
    description: "Oversees multiple regions and high-value approvals",
    canApprove: true,
    canAssign: true,
    canReject: true,
    maxApprovalAmount: 5000000, // 50 Lakhs
    regions: ["West Zone"],
  },
  {
    id: "role_national_head",
    name: "National Head",
    level: 3,
    description: "National level approvals and policy decisions",
    canApprove: true,
    canAssign: true,
    canReject: true,
    maxApprovalAmount: 10000000, // 1 Crore
    regions: ["All"],
  },
  {
    id: "role_ceo",
    name: "CEO",
    level: 4,
    description: "Final authority for strategic approvals",
    canApprove: true,
    canAssign: true,
    canReject: true,
    maxApprovalAmount: 999999999,
    regions: ["All"],
  },
];

// Mock Corporate Users
export const mockCorporateUsers: CorporateUser[] = [
  {
    id: "corp_user_001",
    tenantId: "tenant_beverage_corp",
    employeeId: "EMP001",
    firstName: "Amit",
    lastName: "Sharma",
    email: "amit.sharma@beveragecorp.com",
    phone: "+91-9876543210",
    role: mockCorporateRoles[0],
    department: "Franchise Operations",
    region: "Maharashtra",
    isActive: true,
    permissions: [],
    createdAt: "2023-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "corp_user_002",
    tenantId: "tenant_beverage_corp",
    employeeId: "EMP002",
    firstName: "Priya",
    lastName: "Patel",
    email: "priya.patel@beveragecorp.com",
    phone: "+91-9876543211",
    role: mockCorporateRoles[0],
    department: "Franchise Operations",
    region: "Gujarat",
    isActive: true,
    permissions: [],
    createdAt: "2023-02-10T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "corp_user_003",
    tenantId: "tenant_beverage_corp",
    employeeId: "EMP003",
    firstName: "Rajesh",
    lastName: "Singh",
    email: "rajesh.singh@beveragecorp.com",
    phone: "+91-9876543212",
    role: mockCorporateRoles[1],
    department: "Franchise Operations",
    region: "West Zone",
    isActive: true,
    permissions: [],
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "corp_user_004",
    tenantId: "tenant_beverage_corp",
    employeeId: "EMP004",
    firstName: "Neha",
    lastName: "Gupta",
    email: "neha.gupta@beveragecorp.com",
    phone: "+91-9876543213",
    role: mockCorporateRoles[2],
    department: "Strategy & Growth",
    isActive: true,
    permissions: [],
    createdAt: "2022-12-01T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
];

// Mock Workflow Assignments
export const mockWorkflowAssignments: WorkflowAssignment[] = [
  {
    id: "assign_001",
    requestId: "req_001",
    assignedFrom: "system",
    assignedTo: "corp_user_001",
    assignedBy: "system",
    assignedAt: "2024-01-16T08:00:00Z",
    dueDate: "2024-01-20T18:00:00Z",
    priority: "high",
    status: "in_progress",
    notes: "Mumbai location requires special attention due to high investment",
  },
  {
    id: "assign_002",
    requestId: "req_002",
    assignedFrom: "system",
    assignedTo: "corp_user_002",
    assignedBy: "system",
    assignedAt: "2024-01-18T10:00:00Z",
    dueDate: "2024-01-22T18:00:00Z",
    priority: "medium",
    status: "pending",
    notes: "Pending document verification",
  },
];

// Mock Workflow Actions
export const mockWorkflowActions: WorkflowAction[] = [
  {
    id: "action_001",
    requestId: "req_001",
    actionType: "comment",
    performedBy: "corp_user_001",
    performedAt: "2024-01-16T09:00:00Z",
    comments:
      "Location analysis shows excellent potential. Market research indicates high demand for beverages in this area.",
    isSystemAction: false,
  },
  {
    id: "action_002",
    requestId: "req_001",
    actionType: "background_check",
    performedBy: "corp_user_001",
    performedAt: "2024-01-16T09:30:00Z",
    comments: "Initiated background verification through CredVerify",
    metadata: { provider: "CredVerify", checkId: "CV_123456" },
    isSystemAction: false,
  },
  {
    id: "action_003",
    requestId: "req_001",
    actionType: "assign",
    performedBy: "corp_user_001",
    performedAt: "2024-01-16T11:00:00Z",
    comments:
      "Escalating to Area Head for final approval due to high investment amount",
    metadata: { assignedTo: "corp_user_003", reason: "high_investment" },
    isSystemAction: false,
  },
  {
    id: "action_004",
    requestId: "req_002",
    actionType: "request_info",
    performedBy: "corp_user_002",
    performedAt: "2024-01-18T14:00:00Z",
    comments:
      "Need clarification on funding source and additional FSSAI documentation",
    isSystemAction: false,
  },
];

// Mock Background Verifications
export const mockBackgroundVerifications: BackgroundVerification[] = [
  {
    id: "bg_001",
    requestId: "req_001",
    customerId: "owner_001",
    verificationStatus: "completed",
    verificationProvider: "CredVerify",
    verificationData: {
      identityVerification: {
        status: "verified",
        score: 95,
        details: "Identity documents verified successfully",
        verifiedAt: "2024-01-16T12:00:00Z",
      },
      creditCheck: {
        status: "verified",
        score: 820,
        details: "Excellent credit score with no defaults",
        verifiedAt: "2024-01-16T12:30:00Z",
      },
      criminalBackground: {
        status: "verified",
        score: 100,
        details: "No criminal records found",
        verifiedAt: "2024-01-16T13:00:00Z",
      },
      businessVerification: {
        status: "verified",
        score: 88,
        details: "Business registration verified, GST active",
        verifiedAt: "2024-01-16T13:30:00Z",
      },
      bankVerification: {
        status: "verified",
        score: 92,
        details: "Bank account verified with adequate balance",
        verifiedAt: "2024-01-16T14:00:00Z",
      },
    },
    startedAt: "2024-01-16T09:30:00Z",
    completedAt: "2024-01-16T14:00:00Z",
    cost: 2500,
    currency: "INR",
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: "notif_001",
    tenantId: "tenant_beverage_corp",
    recipientId: "corp_user_001",
    recipientType: "user",
    channel: "in_app",
    title: "New Franchisee Application",
    message: "A new franchisee application has been assigned to you for review",
    data: { requestId: "req_001", requestNumber: "FR-2024-001" },
    status: "read",
    sentAt: "2024-01-16T08:00:00Z",
    readAt: "2024-01-16T08:30:00Z",
    priority: "medium",
  },
  {
    id: "notif_002",
    tenantId: "tenant_beverage_corp",
    recipientId: "corp_user_003",
    recipientType: "user",
    channel: "email",
    title: "Escalation: High Value Application",
    message:
      "A franchisee application requiring your approval has been escalated",
    data: { requestId: "req_001", amount: 2500000 },
    status: "sent",
    sentAt: "2024-01-16T11:00:00Z",
    priority: "high",
  },
];

// Mock Audit Logs
export const mockAuditLogs: AuditLog[] = [
  {
    id: "audit_001",
    tenantId: "tenant_beverage_corp",
    entityType: "franchisee_request",
    entityId: "req_001",
    action: "status_changed",
    performedBy: "corp_user_001",
    performedAt: "2024-01-16T09:00:00Z",
    changes: [
      { field: "status", oldValue: "submitted", newValue: "under_review" },
    ],
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "audit_002",
    tenantId: "tenant_beverage_corp",
    entityType: "assignment",
    entityId: "assign_001",
    action: "created",
    performedBy: "system",
    performedAt: "2024-01-16T08:00:00Z",
    metadata: { autoAssigned: true, rule: "region_based" },
    ipAddress: "10.0.0.1",
  },
];

// Mock Corporate Dashboard
export const mockCorporateDashboard: CorporateDashboard = {
  pendingRequests: 8,
  myAssignments: 3,
  overdueItems: 1,
  completedToday: 5,
  approvalStats: {
    totalProcessed: 45,
    approvalRate: 78.5,
    averageProcessingTime: 16.5,
  },
  regionStats: [
    { region: "Maharashtra", pending: 4, approved: 12, rejected: 2 },
    { region: "Gujarat", pending: 2, approved: 8, rejected: 1 },
    { region: "Karnataka", pending: 3, approved: 10, rejected: 1 },
  ],
  recentActivities: mockWorkflowActions.slice(0, 5),
  performanceMetrics: {
    productivity: 87,
    quality: 92,
    timeliness: 85,
  },
};

// Mock Workflow Comments
export const mockWorkflowComments: WorkflowComment[] = [
  {
    id: "comment_001",
    requestId: "req_001",
    authorId: "corp_user_001",
    authorName: "Amit Sharma",
    content:
      "Location analysis completed. The proposed location shows excellent market potential with high footfall.",
    isInternal: false,
    createdAt: "2024-01-16T09:00:00Z",
  },
  {
    id: "comment_002",
    requestId: "req_001",
    authorId: "corp_user_001",
    authorName: "Amit Sharma",
    content:
      "Internal note: Need to verify funding source before final approval.",
    isInternal: true,
    createdAt: "2024-01-16T09:15:00Z",
  },
  {
    id: "comment_003",
    requestId: "req_001",
    authorId: "corp_user_003",
    authorName: "Rajesh Singh",
    content:
      "Reviewed all documents. Investment capacity is verified. Recommending approval.",
    isInternal: false,
    createdAt: "2024-01-16T15:00:00Z",
  },
];

// Mock Notification Rules
export const mockNotificationRules: NotificationRule[] = [
  {
    id: "rule_001",
    name: "New Application Assignment",
    description: "Notify when a new application is assigned",
    trigger: { event: "request_assigned" },
    recipients: [{ type: "user", value: "assignee" }],
    channels: [
      { type: "in_app", isEnabled: true },
      { type: "email", isEnabled: true },
    ],
    template: "new_assignment",
    isActive: true,
  },
  {
    id: "rule_002",
    name: "High Value Escalation",
    description: "Escalate high value applications",
    trigger: { event: "request_submitted" },
    recipients: [{ type: "role", value: "area_head" }],
    channels: [
      { type: "email", isEnabled: true },
      { type: "sms", isEnabled: true },
    ],
    template: "high_value_alert",
    isActive: true,
    conditions: [
      { field: "investmentCapacity", operator: "greater_than", value: 3000000 },
    ],
  },
];

// Mock Escalation Rules
export const mockEscalationRules: EscalationRule[] = [
  {
    id: "esc_001",
    name: "Time-based Escalation",
    description: "Escalate if not processed within 48 hours",
    conditions: [
      {
        type: "time_based",
        operator: "greater_than",
        value: 48,
        unit: "hours",
      },
    ],
    actions: [
      { type: "notify", target: "supervisor" },
      { type: "reassign", target: "backup_reviewer" },
    ],
    isActive: true,
    priority: 1,
  },
  {
    id: "esc_002",
    name: "High Value Auto-escalation",
    description: "Auto-escalate high value applications",
    conditions: [
      { type: "amount_based", operator: "greater_than", value: 5000000 },
    ],
    actions: [
      { type: "reassign", target: "national_head" },
      { type: "notify", target: "stakeholders" },
    ],
    isActive: true,
    priority: 2,
  },
];

// Mock Analytics
export const mockWorkflowAnalytics: WorkflowAnalytics = {
  processingTimes: {
    average: 16.5,
    median: 14,
    p95: 28,
    byStage: [
      { stage: "Document Review", avgTime: 4.2 },
      { stage: "Background Check", avgTime: 8.5 },
      { stage: "Final Approval", avgTime: 3.8 },
    ],
  },
  approvalRates: {
    overall: 78.5,
    byRegion: [
      { region: "Maharashtra", rate: 82.1 },
      { region: "Gujarat", rate: 79.3 },
      { region: "Karnataka", rate: 75.8 },
    ],
    byAmount: [
      { range: "0-15L", rate: 85.2 },
      { range: "15-30L", rate: 78.1 },
      { range: "30L+", rate: 65.4 },
    ],
  },
  bottlenecks: [
    { stage: "Background Verification", avgDelay: 12.3, count: 15 },
    { stage: "Financial Assessment", avgDelay: 8.7, count: 8 },
  ],
  userPerformance: [
    {
      userId: "corp_user_001",
      userName: "Amit Sharma",
      processed: 25,
      avgTime: 14.2,
      approvalRate: 82,
    },
    {
      userId: "corp_user_002",
      userName: "Priya Patel",
      processed: 18,
      avgTime: 16.8,
      approvalRate: 75,
    },
    {
      userId: "corp_user_003",
      userName: "Rajesh Singh",
      processed: 12,
      avgTime: 12.5,
      approvalRate: 88,
    },
  ],
};

// Helper Functions
export const getAssignmentsByUser = (userId: string): WorkflowAssignment[] => {
  return mockWorkflowAssignments.filter(
    (assignment) => assignment.assignedTo === userId,
  );
};

export const getActionsByRequest = (requestId: string): WorkflowAction[] => {
  return mockWorkflowActions.filter((action) => action.requestId === requestId);
};

export const getCommentsByRequest = (requestId: string): WorkflowComment[] => {
  return mockWorkflowComments.filter(
    (comment) => comment.requestId === requestId,
  );
};

export const getUsersByRole = (roleName: string): CorporateUser[] => {
  return mockCorporateUsers.filter((user) => user.role.name === roleName);
};

export const getNotificationsByUser = (userId: string): Notification[] => {
  return mockNotifications.filter(
    (notification) => notification.recipientId === userId,
  );
};

export const getAuditLogsByEntity = (entityId: string): AuditLog[] => {
  return mockAuditLogs.filter((log) => log.entityId === entityId);
};

export const calculateUserPerformance = (userId: string) => {
  const userActions = mockWorkflowActions.filter(
    (action) => action.performedBy === userId,
  );
  const userAssignments = mockWorkflowAssignments.filter(
    (assignment) => assignment.assignedTo === userId,
  );

  return {
    totalActions: userActions.length,
    totalAssignments: userAssignments.length,
    completedAssignments: userAssignments.filter(
      (a) => a.status === "completed",
    ).length,
    avgResponseTime: 14.5, // Mock calculation
    efficiency: 87.5, // Mock calculation
  };
};
