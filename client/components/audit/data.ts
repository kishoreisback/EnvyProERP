import {
  SystemAuditLog,
  SecurityEvent,
  FranchiseeAuditEvent,
  InventoryAuditEvent,
  OrderAuditEvent,
  POApprovalEvent,
  AuditSummary,
  AuditDashboardMetrics,
  AuditConfiguration,
  AuditResourceType,
} from "./types";

// Mock users for audit events
const mockUsers = [
  {
    id: "user_001",
    name: "John Smith",
    email: "john.smith@buildpro.com",
    role: "admin",
  },
  {
    id: "user_002",
    name: "Sarah Johnson",
    email: "sarah.johnson@buildpro.com",
    role: "manager",
  },
  {
    id: "user_003",
    name: "Mike Wilson",
    email: "mike.wilson@buildpro.com",
    role: "franchisee",
  },
  {
    id: "user_004",
    name: "Lisa Chen",
    email: "lisa.chen@buildpro.com",
    role: "corporate_manager",
  },
  {
    id: "user_005",
    name: "David Brown",
    email: "david.brown@buildpro.com",
    role: "regional_manager",
  },
  {
    id: "user_006",
    name: "Emily Davis",
    email: "emily.davis@buildpro.com",
    role: "inventory_manager",
  },
  {
    id: "user_007",
    name: "Robert Taylor",
    email: "robert.taylor@buildpro.com",
    role: "sales_rep",
  },
  {
    id: "user_008",
    name: "Maria Garcia",
    email: "maria.garcia@buildpro.com",
    role: "finance_manager",
  },
];

const ipAddresses = [
  "192.168.1.100",
  "10.0.1.50",
  "172.16.0.25",
  "203.0.113.10",
  "198.51.100.15",
  "172.16.1.100",
  "10.10.1.75",
  "192.168.100.50",
];

const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)",
  "Mozilla/5.0 (Android 11; Mobile; rv:91.0) Gecko/91.0",
];

function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateTimestamp(daysAgo: number = 0, hoursAgo: number = 0): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(date.getHours() - hoursAgo);
  date.setMinutes(Math.floor(Math.random() * 60));
  date.setSeconds(Math.floor(Math.random() * 60));
  return date.toISOString();
}

function generateCorrelationId(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

// Generate Authentication Audit Events
function generateAuthenticationEvents(
  tenantId: string,
  count: number = 50,
): SecurityEvent[] {
  const events: SecurityEvent[] = [];

  for (let i = 0; i < count; i++) {
    const user = randomChoice(mockUsers);
    const isSuccess = Math.random() > 0.15; // 85% success rate
    const eventType = isSuccess ? "login_success" : "login_failure";

    events.push({
      id: `auth_${Date.now()}_${i}`,
      tenantId,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      userRole: user.role,
      action: eventType,
      resource: "authentication",
      resourceType: "authentication",
      module: "auth",
      description: isSuccess
        ? `User ${user.name} logged in successfully`
        : `Failed login attempt for ${user.name}`,
      status: isSuccess ? "success" : "failure",
      severity: isSuccess ? "info" : "warning",
      riskLevel: isSuccess ? "low" : "medium",
      ipAddress: randomChoice(ipAddresses),
      userAgent: randomChoice(userAgents),
      timestamp: generateTimestamp(
        Math.floor(Math.random() * 30),
        Math.floor(Math.random() * 24),
      ),
      securityEventType: eventType,
      failedAttempts: isSuccess ? 0 : Math.floor(Math.random() * 3) + 1,
      geolocation: {
        country: "India",
        region: randomChoice(["Maharashtra", "Karnataka", "Delhi", "Gujarat"]),
        city: randomChoice([
          "Mumbai",
          "Bangalore",
          "Delhi",
          "Pune",
          "Ahmedabad",
        ]),
        latitude: 19.076 + (Math.random() - 0.5) * 10,
        longitude: 72.8777 + (Math.random() - 0.5) * 10,
      },
      details: {
        loginMethod: randomChoice(["password", "sso", "mfa"]),
        deviceType: randomChoice(["desktop", "mobile", "tablet"]),
        browser: randomChoice(["Chrome", "Firefox", "Safari", "Edge"]),
      },
    });
  }

  return events;
}

// Generate Order Audit Events
function generateOrderEvents(
  tenantId: string,
  count: number = 40,
): OrderAuditEvent[] {
  const events: OrderAuditEvent[] = [];

  const orderActions = [
    "order.created",
    "order.updated",
    "order.approved",
    "order.cancelled",
    "order.shipped",
    "order.delivered",
    "order.returned",
    "order.refunded",
  ];

  for (let i = 0; i < count; i++) {
    const user = randomChoice(mockUsers);
    const action = randomChoice(orderActions);
    const orderNumber = `ORD-${Date.now()}-${String(i).padStart(3, "0")}`;
    const amount = Math.floor(Math.random() * 50000) + 5000;

    events.push({
      id: `order_${Date.now()}_${i}`,
      tenantId,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      userRole: user.role,
      action,
      resource: `order/${orderNumber}`,
      resourceType: "order",
      resourceId: `order_${i}`,
      module: "sales",
      description: `${action.replace("order.", "").replace("_", " ")} order ${orderNumber}`,
      status: "success",
      severity:
        action.includes("cancelled") || action.includes("returned")
          ? "warning"
          : "info",
      riskLevel: amount > 30000 ? "medium" : "low",
      ipAddress: randomChoice(ipAddresses),
      userAgent: randomChoice(userAgents),
      timestamp: generateTimestamp(
        Math.floor(Math.random() * 15),
        Math.floor(Math.random() * 24),
      ),
      orderId: `order_${i}`,
      orderNumber,
      orderType: randomChoice(["sales", "purchase", "transfer"]),
      orderStatus: randomChoice([
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled",
      ]),
      totalAmount: amount,
      currency: "INR",
      lineItemsCount: Math.floor(Math.random() * 10) + 1,
      territoryCode: randomChoice(["MH-01", "KA-02", "DL-03", "GJ-04"]),
      details: {
        paymentMethod: randomChoice([
          "credit_card",
          "bank_transfer",
          "cheque",
          "cash",
        ]),
        deliveryMethod: randomChoice(["standard", "express", "pickup"]),
        discount: Math.floor(Math.random() * 1000),
      },
    });
  }

  return events;
}

// Generate Inventory Audit Events
function generateInventoryEvents(
  tenantId: string,
  count: number = 35,
): InventoryAuditEvent[] {
  const events: InventoryAuditEvent[] = [];

  const inventoryActions = [
    "inventory.stock_adjusted",
    "inventory.item_added",
    "inventory.item_removed",
    "inventory.transfer",
    "inventory.recount",
    "inventory.write_off",
  ];

  const products = [
    { id: "prod_001", name: "Portland Cement - 50kg" },
    { id: "prod_002", name: "Steel Rebar - 12mm" },
    { id: "prod_003", name: "Red Bricks - Standard" },
    { id: "prod_004", name: "River Sand - 1 Ton" },
    { id: "prod_005", name: "Aggregate Stone - 20mm" },
    { id: "prod_006", name: "TMT Bars - 16mm" },
  ];

  for (let i = 0; i < count; i++) {
    const user = randomChoice(mockUsers);
    const action = randomChoice(inventoryActions);
    const product = randomChoice(products);
    const quantityChange = Math.floor(Math.random() * 100) + 1;
    const isIncrease = Math.random() > 0.4;

    events.push({
      id: `inv_${Date.now()}_${i}`,
      tenantId,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      userRole: user.role,
      action,
      resource: `inventory/${product.id}`,
      resourceType: "inventory",
      resourceId: product.id,
      module: "inventory",
      description: `${action.replace("inventory.", "").replace("_", " ")} for ${product.name}`,
      status: "success",
      severity: action.includes("write_off") ? "warning" : "info",
      riskLevel: quantityChange > 50 ? "medium" : "low",
      ipAddress: randomChoice(ipAddresses),
      userAgent: randomChoice(userAgents),
      timestamp: generateTimestamp(
        Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 24),
      ),
      productId: product.id,
      productName: product.name,
      warehouseId: randomChoice(["WH-001", "WH-002", "WH-003"]),
      locationCode: randomChoice(["A1-01", "B2-05", "C3-12"]),
      quantityBefore: Math.floor(Math.random() * 500) + 100,
      quantityAfter: 0, // Will be calculated
      quantityChange: isIncrease ? quantityChange : -quantityChange,
      unitCost: Math.floor(Math.random() * 1000) + 100,
      adjustmentReason: randomChoice([
        "Stock receipt",
        "Damage",
        "Theft",
        "Recount",
        "Transfer",
        "Sale",
      ]),
      details: {
        referenceDocument: `REF-${Date.now()}-${i}`,
        approvedBy: randomChoice(mockUsers).name,
        notes: "System generated audit event",
      },
    });

    // Calculate quantityAfter
    events[events.length - 1].quantityAfter =
      events[events.length - 1].quantityBefore! +
      events[events.length - 1].quantityChange!;
  }

  return events;
}

// Generate Purchase Order Approval Events
function generatePOApprovalEvents(
  tenantId: string,
  count: number = 25,
): POApprovalEvent[] {
  const events: POApprovalEvent[] = [];

  const poActions = [
    "po.created",
    "po.submitted",
    "po.approved",
    "po.rejected",
    "po.cancelled",
    "po.revised",
    "po.auto_approved",
  ];

  const suppliers = [
    { id: "sup_001", name: "Cement Works Ltd" },
    { id: "sup_002", name: "Steel Industries Pvt Ltd" },
    { id: "sup_003", name: "Construction Materials Co" },
    { id: "sup_004", name: "Building Supplies Inc" },
  ];

  for (let i = 0; i < count; i++) {
    const user = randomChoice(mockUsers);
    const action = randomChoice(poActions);
    const supplier = randomChoice(suppliers);
    const poNumber = `PO-${Date.now()}-${String(i).padStart(3, "0")}`;
    const amount = Math.floor(Math.random() * 100000) + 10000;

    events.push({
      id: `po_${Date.now()}_${i}`,
      tenantId,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      userRole: user.role,
      action,
      resource: `purchase_order/${poNumber}`,
      resourceType: "purchase_order",
      resourceId: `po_${i}`,
      module: "procurement",
      description: `${action.replace("po.", "").replace("_", " ")} purchase order ${poNumber}`,
      status: action.includes("rejected") ? "failure" : "success",
      severity:
        action.includes("rejected") || action.includes("cancelled")
          ? "warning"
          : "info",
      riskLevel: amount > 75000 ? "high" : amount > 40000 ? "medium" : "low",
      ipAddress: randomChoice(ipAddresses),
      userAgent: randomChoice(userAgents),
      timestamp: generateTimestamp(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 24),
      ),
      poId: `po_${i}`,
      poNumber,
      poAmount: amount,
      currency: "INR",
      supplierId: supplier.id,
      supplierName: supplier.name,
      requestorId: user.id,
      requestorName: user.name,
      approvalLevel: Math.floor(Math.random() * 3) + 1,
      approvalStatus: randomChoice(["pending", "approved", "rejected"]),
      urgencyLevel: randomChoice(["low", "medium", "high", "urgent"]),
      complianceChecks: {
        budgetCheck: true,
        supplierCheck: true,
        policyCheck: Math.random() > 0.1,
        authorizationCheck: true,
      },
      details: {
        deliveryDate: new Date(
          Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        category: randomChoice([
          "raw_materials",
          "equipment",
          "services",
          "maintenance",
        ]),
        department: randomChoice(["construction", "procurement", "operations"]),
      },
    });
  }

  return events;
}

// Generate Franchisee Management Events
function generateFranchiseeEvents(
  tenantId: string,
  count: number = 20,
): FranchiseeAuditEvent[] {
  const events: FranchiseeAuditEvent[] = [];

  const franchiseeActions = [
    "franchisee.onboarded",
    "franchisee.suspended",
    "franchisee.reactivated",
    "franchisee.territory_assigned",
    "franchisee.performance_reviewed",
    "franchisee.contract_renewed",
    "franchisee.terminated",
  ];

  const franchisees = [
    { id: "fr_001", name: "BuildPro Mumbai Central", territory: "MH-01" },
    { id: "fr_002", name: "BuildPro Bangalore North", territory: "KA-02" },
    { id: "fr_003", name: "BuildPro Delhi East", territory: "DL-03" },
    { id: "fr_004", name: "BuildPro Pune West", territory: "MH-04" },
  ];

  for (let i = 0; i < count; i++) {
    const user = randomChoice(mockUsers);
    const action = randomChoice(franchiseeActions);
    const franchisee = randomChoice(franchisees);

    events.push({
      id: `fr_${Date.now()}_${i}`,
      tenantId,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      userRole: user.role,
      action,
      resource: `franchisee/${franchisee.id}`,
      resourceType: "franchisee",
      resourceId: franchisee.id,
      module: "franchisee",
      description: `${action.replace("franchisee.", "").replace("_", " ")} ${franchisee.name}`,
      status: "success",
      severity:
        action.includes("suspended") || action.includes("terminated")
          ? "warning"
          : "info",
      riskLevel: action.includes("terminated") ? "high" : "medium",
      ipAddress: randomChoice(ipAddresses),
      userAgent: randomChoice(userAgents),
      timestamp: generateTimestamp(
        Math.floor(Math.random() * 25),
        Math.floor(Math.random() * 24),
      ),
      franchiseeId: franchisee.id,
      franchiseeName: franchisee.name,
      franchiseeStatus: randomChoice([
        "active",
        "suspended",
        "terminated",
        "pending",
      ]),
      territoryCode: franchisee.territory,
      businessImpact: randomChoice(["low", "medium", "high"]),
      details: {
        reason: randomChoice([
          "Performance issues",
          "Contract violation",
          "Business expansion",
          "Routine review",
        ]),
        reviewScore: Math.floor(Math.random() * 5) + 1,
        nextReviewDate: new Date(
          Date.now() + 90 * 24 * 60 * 60 * 1000,
        ).toISOString(),
      },
    });
  }

  return events;
}

// Generate comprehensive audit logs
export function generateSystemAuditLogs(tenantId: string): SystemAuditLog[] {
  const allEvents: SystemAuditLog[] = [
    ...generateAuthenticationEvents(tenantId, 50),
    ...generateOrderEvents(tenantId, 40),
    ...generateInventoryEvents(tenantId, 35),
    ...generatePOApprovalEvents(tenantId, 25),
    ...generateFranchiseeEvents(tenantId, 20),
  ];

  // Sort by timestamp (newest first)
  return allEvents.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
}

// Generate audit summary
export function generateAuditSummary(logs: SystemAuditLog[]): AuditSummary {
  const totalEvents = logs.length;
  const successfulEvents = logs.filter(
    (log) => log.status === "success",
  ).length;
  const failedEvents = logs.filter((log) => log.status === "failure").length;
  const criticalEvents = logs.filter(
    (log) => log.severity === "critical",
  ).length;
  const warningEvents = logs.filter((log) => log.severity === "warning").length;

  const uniqueUsers = new Set(logs.map((log) => log.userId)).size;

  // Most active user
  const userActivity = logs.reduce(
    (acc, log) => {
      acc[log.userId] = (acc[log.userId] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const mostActiveUserId = Object.keys(userActivity).reduce((a, b) =>
    userActivity[a] > userActivity[b] ? a : b,
  );
  const mostActiveUser =
    logs.find((log) => log.userId === mostActiveUserId)?.userName || "Unknown";

  // Most common action
  const actionCounts = logs.reduce(
    (acc, log) => {
      acc[log.action] = (acc[log.action] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const mostCommonAction = Object.keys(actionCounts).reduce((a, b) =>
    actionCounts[a] > actionCounts[b] ? a : b,
  );

  // Risk distribution
  const riskDistribution = {
    low: logs.filter((log) => log.riskLevel === "low").length,
    medium: logs.filter((log) => log.riskLevel === "medium").length,
    high: logs.filter((log) => log.riskLevel === "high").length,
    critical: logs.filter((log) => log.riskLevel === "critical").length,
  };

  // Module activity
  const moduleActivity = logs.reduce(
    (acc, log) => {
      acc[log.module] = (acc[log.module] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Timeline data (last 7 days)
  const timelineData = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayStart = new Date(date.setHours(0, 0, 0, 0));
    const dayEnd = new Date(date.setHours(23, 59, 59, 999));

    const dayLogs = logs.filter((log) => {
      const logDate = new Date(log.timestamp);
      return logDate >= dayStart && logDate <= dayEnd;
    });

    timelineData.push({
      timestamp: dayStart.toISOString(),
      eventCount: dayLogs.length,
      successCount: dayLogs.filter((log) => log.status === "success").length,
      failureCount: dayLogs.filter((log) => log.status === "failure").length,
    });
  }

  return {
    totalEvents,
    successfulEvents,
    failedEvents,
    criticalEvents,
    warningEvents,
    uniqueUsers,
    mostActiveUser,
    mostCommonAction,
    riskDistribution,
    moduleActivity,
    timelineData,
  };
}

// Generate dashboard metrics
export function generateAuditDashboardMetrics(
  tenantId: string,
): AuditDashboardMetrics {
  const logs = generateSystemAuditLogs(tenantId);
  const summary = generateAuditSummary(logs);

  // Get today's logs
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayLogs = logs.filter((log) => new Date(log.timestamp) >= today);

  // Calculate trends (mock data for demo)
  const eventsTrend = Math.floor((Math.random() - 0.5) * 20); // -10% to +10%
  const riskTrend = Math.floor((Math.random() - 0.5) * 15);
  const securityTrend = Math.floor((Math.random() - 0.5) * 25);
  const userActivityTrend = Math.floor((Math.random() - 0.5) * 18);

  return {
    tenantId,
    period: "today",
    totalEvents: todayLogs.length,
    criticalEvents: todayLogs.filter(
      (log) => log.severity === "critical" || log.riskLevel === "critical",
    ).length,
    securityIncidents: todayLogs.filter(
      (log) =>
        log.resourceType === "authentication" && log.status === "failure",
    ).length,
    failedOperations: todayLogs.filter((log) => log.status === "failure")
      .length,
    uniqueActiveUsers: new Set(todayLogs.map((log) => log.userId)).size,
    eventsTrend,
    riskTrend,
    securityTrend,
    userActivityTrend,
    topUsers: Object.entries(
      todayLogs.reduce(
        (acc, log) => {
          if (!acc[log.userId]) {
            acc[log.userId] = {
              userName: log.userName,
              eventCount: 0,
              riskScore: 0,
            };
          }
          acc[log.userId].eventCount++;
          acc[log.userId].riskScore +=
            log.riskLevel === "critical"
              ? 4
              : log.riskLevel === "high"
                ? 3
                : log.riskLevel === "medium"
                  ? 2
                  : 1;
          return acc;
        },
        {} as Record<string, any>,
      ),
    )
      .map(([userId, data]) => ({
        userId,
        userName: data.userName,
        eventCount: data.eventCount,
        riskScore: data.riskScore,
      }))
      .slice(0, 5),
    topActions: Object.entries(
      todayLogs.reduce(
        (acc, log) => {
          acc[log.action] = (acc[log.action] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      ),
    )
      .map(([action, count]) => ({
        action,
        count,
        riskLevel:
          logs.find((log) => log.action === action)?.riskLevel || "low",
      }))
      .slice(0, 5),
    recentCriticalEvents: logs
      .filter(
        (log) => log.severity === "critical" || log.riskLevel === "critical",
      )
      .slice(0, 5),
    activityTimeline: summary.timelineData.map((item) => ({
      timestamp: item.timestamp,
      events: item.eventCount,
      risks: item.failureCount,
    })),
    moduleActivity: Object.entries(summary.moduleActivity).map(
      ([module, events]) => ({
        module,
        events,
        percentage: Math.round((events / summary.totalEvents) * 100),
      }),
    ),
    riskDistribution: Object.entries(summary.riskDistribution).map(
      ([level, count]) => ({
        level,
        count,
        percentage: Math.round((count / summary.totalEvents) * 100),
      }),
    ),
  };
}

// Default audit configuration
export const defaultAuditConfiguration: AuditConfiguration = {
  tenantId: "default",
  enabled: true,
  retentionPeriodDays: 365,
  archiveAfterDays: 90,
  deleteAfterDays: 2555, // 7 years
  auditCategories: {
    authentication: true,
    userManagement: true,
    roleManagement: true,
    orderManagement: true,
    inventoryManagement: true,
    poApprovals: true,
    franchiseeOperations: true,
    systemConfiguration: true,
    dataExport: true,
    reportGeneration: true,
    integrations: true,
    workflowOperations: true,
  },
  minimumSeverityLevel: "info",
  realTimeAlerts: true,
  alertThresholds: {
    failedLoginsPerHour: 10,
    criticalEventsPerHour: 5,
    unauthorizedAccessAttempts: 3,
    dataExportVolumeThreshold: 1000,
  },
  complianceStandards: ["SOX", "ISO27001", "GDPR"],
  requireDigitalSignatures: false,
  immutableLogging: true,
  allowExport: true,
  exportFormats: ["csv", "xlsx", "pdf", "json"],
  scheduledReports: true,
};

// Get audit logs by tenant
export function getAuditLogsByTenant(tenantId: string): SystemAuditLog[] {
  return generateSystemAuditLogs(tenantId);
}

// Get audit logs by module
export function getAuditLogsByModule(
  tenantId: string,
  module: string,
): SystemAuditLog[] {
  const logs = generateSystemAuditLogs(tenantId);
  return logs.filter((log) => log.module === module);
}

// Get recent security events
export function getRecentSecurityEvents(
  tenantId: string,
  hours: number = 24,
): SecurityEvent[] {
  const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
  const logs = generateSystemAuditLogs(tenantId);
  return logs.filter(
    (log) =>
      log.resourceType === "authentication" && new Date(log.timestamp) > cutoff,
  ) as SecurityEvent[];
}

// Get high-risk events
export function getHighRiskEvents(
  tenantId: string,
  days: number = 7,
): SystemAuditLog[] {
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const logs = generateSystemAuditLogs(tenantId);
  return logs.filter(
    (log) =>
      (log.riskLevel === "high" || log.riskLevel === "critical") &&
      new Date(log.timestamp) > cutoff,
  );
}
