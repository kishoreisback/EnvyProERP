import { useLogger } from "./useLogger";
import { useCallback } from "react";

interface AuditLogParams {
  action: string;
  resource: string;
  resourceType: string;
  resourceId?: string;
  description?: string;
  oldValues?: Record<string, any>;
  newValues?: Record<string, any>;
  status?: "success" | "failure" | "partial";
  severity?: "info" | "warning" | "error" | "critical";
  riskLevel?: "low" | "medium" | "high" | "critical";
  details?: Record<string, any>;
}

export function useAuditLogger(module: string) {
  const { logUserAction, logSecurityEvent } = useLogger();

  const logAudit = useCallback(
    (params: AuditLogParams) => {
      const currentUser = JSON.parse(
        localStorage.getItem("currentUser") || "{}",
      );

      logUserAction(`${module}.${params.action}`, module, {
        resource: params.resource,
        resourceType: params.resourceType,
        resourceId: params.resourceId,
        description:
          params.description || `${params.action} ${params.resource}`,
        oldValues: params.oldValues,
        newValues: params.newValues,
        status: params.status || "success",
        severity: params.severity || "info",
        riskLevel: params.riskLevel || "low",
        tenantId: currentUser?.tenantId,
        userId: currentUser?.id,
        userName: currentUser?.name,
        userEmail: currentUser?.email,
        userRole: currentUser?.role,
        timestamp: new Date().toISOString(),
        ...params.details,
      });
    },
    [module, logUserAction],
  );

  // Specific audit methods for common operations
  const logOrderEvent = useCallback(
    (params: {
      orderId: string;
      orderNumber: string;
      action:
        | "created"
        | "updated"
        | "approved"
        | "cancelled"
        | "shipped"
        | "delivered";
      orderData?: any;
      previousData?: any;
    }) => {
      logAudit({
        action: `order.${params.action}`,
        resource: `order/${params.orderNumber}`,
        resourceType: "order",
        resourceId: params.orderId,
        description: `Order ${params.orderNumber} was ${params.action}`,
        oldValues: params.previousData,
        newValues: params.orderData,
        riskLevel: params.action === "cancelled" ? "medium" : "low",
        severity: params.action === "cancelled" ? "warning" : "info",
      });
    },
    [logAudit],
  );

  const logInventoryEvent = useCallback(
    (params: {
      productId: string;
      productName: string;
      action:
        | "stock_adjusted"
        | "item_added"
        | "item_removed"
        | "transfer"
        | "recount";
      quantityChange?: number;
      reason?: string;
      warehouseId?: string;
    }) => {
      logAudit({
        action: `inventory.${params.action}`,
        resource: `inventory/${params.productId}`,
        resourceType: "inventory",
        resourceId: params.productId,
        description: `${params.action.replace("_", " ")} for ${params.productName}`,
        riskLevel:
          Math.abs(params.quantityChange || 0) > 100 ? "medium" : "low",
        details: {
          quantityChange: params.quantityChange,
          reason: params.reason,
          warehouseId: params.warehouseId,
        },
      });
    },
    [logAudit],
  );

  const logPOEvent = useCallback(
    (params: {
      poId: string;
      poNumber: string;
      action: "created" | "submitted" | "approved" | "rejected" | "cancelled";
      amount?: number;
      supplierId?: string;
      approver?: string;
      rejectionReason?: string;
    }) => {
      logAudit({
        action: `po.${params.action}`,
        resource: `purchase_order/${params.poNumber}`,
        resourceType: "purchase_order",
        resourceId: params.poId,
        description: `Purchase Order ${params.poNumber} was ${params.action}`,
        status: params.action === "rejected" ? "failure" : "success",
        severity:
          params.action === "rejected" || params.action === "cancelled"
            ? "warning"
            : "info",
        riskLevel:
          (params.amount || 0) > 75000
            ? "high"
            : (params.amount || 0) > 40000
              ? "medium"
              : "low",
        details: {
          amount: params.amount,
          supplierId: params.supplierId,
          approver: params.approver,
          rejectionReason: params.rejectionReason,
        },
      });
    },
    [logAudit],
  );

  const logUserManagementEvent = useCallback(
    (params: {
      targetUserId: string;
      targetUserName: string;
      action:
        | "created"
        | "updated"
        | "activated"
        | "deactivated"
        | "suspended"
        | "role_changed"
        | "permissions_modified";
      changes?: Record<string, any>;
      previousValues?: Record<string, any>;
    }) => {
      logAudit({
        action: `user.${params.action}`,
        resource: `user/${params.targetUserName}`,
        resourceType: "user",
        resourceId: params.targetUserId,
        description: `User ${params.targetUserName} was ${params.action}`,
        oldValues: params.previousValues,
        newValues: params.changes,
        riskLevel:
          params.action.includes("suspend") || params.action.includes("role")
            ? "medium"
            : "low",
        severity: params.action.includes("suspend") ? "warning" : "info",
      });
    },
    [logAudit],
  );

  const logFranchiseeEvent = useCallback(
    (params: {
      franchiseeId: string;
      franchiseeName: string;
      action:
        | "onboarded"
        | "suspended"
        | "reactivated"
        | "territory_assigned"
        | "performance_reviewed"
        | "terminated";
      territoryCode?: string;
      reason?: string;
      reviewScore?: number;
    }) => {
      logAudit({
        action: `franchisee.${params.action}`,
        resource: `franchisee/${params.franchiseeId}`,
        resourceType: "franchisee",
        resourceId: params.franchiseeId,
        description: `Franchisee ${params.franchiseeName} was ${params.action}`,
        riskLevel:
          params.action === "terminated" || params.action === "suspended"
            ? "high"
            : "medium",
        severity:
          params.action === "terminated" || params.action === "suspended"
            ? "warning"
            : "info",
        details: {
          territoryCode: params.territoryCode,
          reason: params.reason,
          reviewScore: params.reviewScore,
        },
      });
    },
    [logAudit],
  );

  const logSecurityAudit = useCallback(
    (params: {
      eventType:
        | "password_change"
        | "permission_escalation"
        | "unauthorized_access"
        | "data_export"
        | "configuration_change";
      severity?: "info" | "warning" | "error" | "critical";
      description?: string;
      details?: Record<string, any>;
    }) => {
      const currentUser = JSON.parse(
        localStorage.getItem("currentUser") || "{}",
      );

      logSecurityEvent({
        type: params.eventType,
        userId: currentUser?.id,
        severity: params.severity || "warning",
        details: {
          module,
          description: params.description,
          ...params.details,
        },
      });
    },
    [module, logSecurityEvent],
  );

  return {
    logAudit,
    logOrderEvent,
    logInventoryEvent,
    logPOEvent,
    logUserManagementEvent,
    logFranchiseeEvent,
    logSecurityAudit,
  };
}
