import { Request, Response, NextFunction } from "express";
import { getLogger } from "../utils/logger";
import { metricsCollector } from "./metrics";

interface AuditEvent {
  id: string;
  timestamp: string;
  tenantId?: string;
  userId?: string;
  sessionId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  method: string;
  endpoint: string;
  userAgent: string;
  ip: string;
  requestData?: any;
  responseStatus: number;
  duration: number;
  changes?: {
    before?: any;
    after?: any;
    fields: string[];
  };
  metadata?: Record<string, any>;
  compliance: {
    gdpr: boolean;
    hipaa: boolean;
    sox: boolean;
    pci: boolean;
  };
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}

interface ComplianceRule {
  name: string;
  description: string;
  required: boolean;
  applies: (event: AuditEvent) => boolean;
  validate: (event: AuditEvent) => boolean;
}

class AuditTrailManager {
  private logger = getLogger();
  private auditEvents: AuditEvent[] = [];
  private complianceRules: ComplianceRule[] = [];

  constructor() {
    this.initializeComplianceRules();
    this.startPeriodicCleanup();
  }

  private initializeComplianceRules(): void {
    this.complianceRules = [
      {
        name: "GDPR Data Access Logging",
        description:
          "All personal data access must be logged for GDPR compliance",
        required: true,
        applies: (event) => this.isPersonalDataAccess(event),
        validate: (event) => event.compliance.gdpr && !!event.userId,
      },
      {
        name: "SOX Financial Transaction Audit",
        description:
          "All financial transactions must be audited for SOX compliance",
        required: true,
        applies: (event) => this.isFinancialTransaction(event),
        validate: (event) => event.compliance.sox && !!event.changes,
      },
      {
        name: "HIPAA Health Data Protection",
        description: "Health data access requires special audit trail",
        required: true,
        applies: (event) => this.isHealthDataAccess(event),
        validate: (event) =>
          event.compliance.hipaa && event.riskLevel !== "LOW",
      },
      {
        name: "PCI Payment Data Security",
        description: "Payment data access must be fully audited",
        required: true,
        applies: (event) => this.isPaymentDataAccess(event),
        validate: (event) => event.compliance.pci && !!event.sessionId,
      },
    ];
  }

  private startPeriodicCleanup(): void {
    // Clean up audit logs every hour
    setInterval(
      () => {
        this.cleanupOldEvents();
      },
      60 * 60 * 1000,
    );
  }

  private cleanupOldEvents(): void {
    const retentionPeriod = 90 * 24 * 60 * 60 * 1000; // 90 days
    const cutoffDate = new Date(Date.now() - retentionPeriod);

    const originalCount = this.auditEvents.length;
    this.auditEvents = this.auditEvents.filter(
      (event) => new Date(event.timestamp) > cutoffDate,
    );

    const removedCount = originalCount - this.auditEvents.length;
    if (removedCount > 0) {
      this.logger.info("AUDIT", `Cleaned up ${removedCount} old audit events`);
    }
  }

  public createAuditEvent(
    req: Request,
    res: Response,
    duration: number,
  ): AuditEvent {
    const event: AuditEvent = {
      id: this.generateEventId(),
      timestamp: new Date().toISOString(),
      tenantId: this.extractTenantId(req),
      userId: this.extractUserId(req),
      sessionId: this.extractSessionId(req),
      action: this.determineAction(req),
      resource: this.determineResource(req),
      resourceId: this.extractResourceId(req),
      method: req.method,
      endpoint: req.originalUrl,
      userAgent: req.get("User-Agent") || "",
      ip: this.extractClientIP(req),
      requestData: this.sanitizeRequestData(req),
      responseStatus: res.statusCode,
      duration,
      changes: this.extractChanges(req, res),
      metadata: this.extractMetadata(req),
      compliance: this.determineComplianceRequirements(req),
      riskLevel: this.assessRiskLevel(req, res),
    };

    return event;
  }

  public recordAuditEvent(event: AuditEvent): void {
    // Validate compliance requirements
    const violations = this.validateCompliance(event);
    if (violations.length > 0) {
      this.logger.error("AUDIT", "Compliance violations detected", {
        eventId: event.id,
        violations,
        event,
      });

      // Record security event for compliance violations
      metricsCollector.recordSecurityEvent({
        timestamp: event.timestamp,
        type: "COMPLIANCE_VIOLATION",
        severity: "HIGH",
        tenantId: event.tenantId,
        details: { violations, auditEventId: event.id },
      });
    }

    // Store audit event
    this.auditEvents.push(event);

    // Log to audit trail
    this.logger.audit({
      auditType: "USER_ACTION",
      component: "AUDIT_TRAIL",
      message: `${event.action} on ${event.resource}`,
      tenantId: event.tenantId,
      userId: event.userId,
      entityType: event.resource,
      entityId: event.resourceId,
      before: event.changes?.before,
      after: event.changes?.after,
      compliance: event.compliance,
      metadata: {
        ...event.metadata,
        ip: event.ip,
        userAgent: event.userAgent,
        duration: event.duration,
        riskLevel: event.riskLevel,
      },
    });

    // Alert on high-risk events
    if (event.riskLevel === "CRITICAL" || event.riskLevel === "HIGH") {
      this.sendRiskAlert(event);
    }
  }

  private validateCompliance(event: AuditEvent): string[] {
    const violations: string[] = [];

    for (const rule of this.complianceRules) {
      if (rule.applies(event) && !rule.validate(event)) {
        violations.push(`${rule.name}: ${rule.description}`);
      }
    }

    return violations;
  }

  private generateEventId(): string {
    return `audit_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }

  private extractTenantId(req: Request): string | undefined {
    return (
      (req.headers["x-tenant-id"] as string) ||
      req.body?.tenantId ||
      (req.query?.tenantId as string) ||
      req.params?.tenantId
    );
  }

  private extractUserId(req: Request): string | undefined {
    // Extract from JWT token or session
    const auth = req.headers.authorization;
    if (auth && auth.startsWith("Bearer ")) {
      try {
        // In real implementation, decode JWT token
        return "user_from_jwt";
      } catch {
        return undefined;
      }
    }
    return (req.headers["x-user-id"] as string) || req.session?.userId;
  }

  private extractSessionId(req: Request): string | undefined {
    return (
      (req.headers["x-session-id"] as string) ||
      req.sessionID ||
      req.session?.id
    );
  }

  private determineAction(req: Request): string {
    const method = req.method;
    const path = req.route?.path || req.path;

    // Map HTTP methods to business actions
    if (method === "POST") {
      if (path.includes("/login")) return "LOGIN";
      if (path.includes("/logout")) return "LOGOUT";
      return "CREATE";
    }
    if (method === "PUT" || method === "PATCH") return "UPDATE";
    if (method === "DELETE") return "DELETE";
    if (method === "GET") {
      if (path.includes("/export")) return "EXPORT";
      if (path.includes("/download")) return "DOWNLOAD";
      return "READ";
    }

    return "UNKNOWN";
  }

  private determineResource(req: Request): string {
    const path = req.route?.path || req.path;

    // Extract resource from API path
    const segments = path.split("/").filter(Boolean);
    if (segments.length > 1 && segments[0] === "api") {
      return segments[1].toUpperCase();
    }

    return "UNKNOWN";
  }

  private extractResourceId(req: Request): string | undefined {
    return req.params?.id || req.body?.id || (req.query?.id as string);
  }

  private extractClientIP(req: Request): string {
    return (
      req.ip ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.headers["x-forwarded-for"] as string) ||
      (req.headers["x-real-ip"] as string) ||
      "unknown"
    );
  }

  private sanitizeRequestData(req: Request): any {
    const sensitiveFields = [
      "password",
      "token",
      "secret",
      "key",
      "ssn",
      "creditCard",
    ];
    const data = { ...req.body };

    // Remove sensitive fields
    for (const field of sensitiveFields) {
      if (data[field]) {
        data[field] = "[REDACTED]";
      }
    }

    return data;
  }

  private extractChanges(req: Request, res: Response): any {
    // This would typically compare before/after states
    // For now, return basic change tracking
    if (req.method === "PUT" || req.method === "PATCH") {
      return {
        before: req.body?.originalData || {},
        after: req.body,
        fields: Object.keys(req.body || {}),
      };
    }
    return undefined;
  }

  private extractMetadata(req: Request): Record<string, any> {
    return {
      referrer: req.get("Referer"),
      acceptLanguage: req.get("Accept-Language"),
      contentType: req.get("Content-Type"),
      contentLength: req.get("Content-Length"),
      requestSize: JSON.stringify(req.body || {}).length,
      queryParams: req.query,
      pathParams: req.params,
    };
  }

  private determineComplianceRequirements(req: Request): any {
    const path = req.path.toLowerCase();
    const resource = this.determineResource(req);

    return {
      gdpr: this.isPersonalDataAccess({
        endpoint: path,
        resource,
      } as AuditEvent),
      hipaa: this.isHealthDataAccess({
        endpoint: path,
        resource,
      } as AuditEvent),
      sox: this.isFinancialTransaction({
        endpoint: path,
        resource,
      } as AuditEvent),
      pci: this.isPaymentDataAccess({ endpoint: path, resource } as AuditEvent),
    };
  }

  private assessRiskLevel(
    req: Request,
    res: Response,
  ): "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" {
    let riskScore = 0;

    // High-risk operations
    if (req.method === "DELETE") riskScore += 3;
    if (req.method === "POST" && req.path.includes("/admin")) riskScore += 2;

    // Sensitive data access
    if (this.isPersonalDataAccess({ endpoint: req.path } as AuditEvent))
      riskScore += 2;
    if (this.isFinancialTransaction({ endpoint: req.path } as AuditEvent))
      riskScore += 3;

    // Response status
    if (res.statusCode >= 400) riskScore += 1;
    if (res.statusCode >= 500) riskScore += 2;

    // Off-hours access
    const hour = new Date().getHours();
    if (hour < 6 || hour > 22) riskScore += 1;

    // Failed authentication
    if (req.path.includes("/login") && res.statusCode !== 200) riskScore += 2;

    if (riskScore >= 5) return "CRITICAL";
    if (riskScore >= 3) return "HIGH";
    if (riskScore >= 1) return "MEDIUM";
    return "LOW";
  }

  private isPersonalDataAccess(event: AuditEvent): boolean {
    const personalDataPaths = [
      "/users",
      "/customers",
      "/contacts",
      "/profile",
      "/personal",
    ];
    return personalDataPaths.some((path) => event.endpoint?.includes(path));
  }

  private isFinancialTransaction(event: AuditEvent): boolean {
    const financialPaths = [
      "/finance",
      "/accounting",
      "/invoices",
      "/payments",
      "/transactions",
    ];
    return financialPaths.some((path) => event.endpoint?.includes(path));
  }

  private isHealthDataAccess(event: AuditEvent): boolean {
    const healthPaths = ["/health", "/medical", "/employee-health"];
    return healthPaths.some((path) => event.endpoint?.includes(path));
  }

  private isPaymentDataAccess(event: AuditEvent): boolean {
    const paymentPaths = [
      "/payments",
      "/billing",
      "/cards",
      "/payment-methods",
    ];
    return paymentPaths.some((path) => event.endpoint?.includes(path));
  }

  private sendRiskAlert(event: AuditEvent): void {
    this.logger.error("AUDIT", "High-risk activity detected", {
      eventId: event.id,
      riskLevel: event.riskLevel,
      action: event.action,
      resource: event.resource,
      userId: event.userId,
      tenantId: event.tenantId,
      ip: event.ip,
    });

    // In production, this would send alerts via:
    // - Email
    // - Slack
    // - PagerDuty
    // - SIEM systems
  }

  // Query methods for audit trail analysis
  public getAuditEvents(filters: {
    tenantId?: string;
    userId?: string;
    resource?: string;
    action?: string;
    startDate?: string;
    endDate?: string;
    riskLevel?: string;
    limit?: number;
    offset?: number;
  }): AuditEvent[] {
    let filtered = this.auditEvents;

    if (filters.tenantId) {
      filtered = filtered.filter((e) => e.tenantId === filters.tenantId);
    }
    if (filters.userId) {
      filtered = filtered.filter((e) => e.userId === filters.userId);
    }
    if (filters.resource) {
      filtered = filtered.filter((e) => e.resource === filters.resource);
    }
    if (filters.action) {
      filtered = filtered.filter((e) => e.action === filters.action);
    }
    if (filters.startDate) {
      filtered = filtered.filter((e) => e.timestamp >= filters.startDate!);
    }
    if (filters.endDate) {
      filtered = filtered.filter((e) => e.timestamp <= filters.endDate!);
    }
    if (filters.riskLevel) {
      filtered = filtered.filter((e) => e.riskLevel === filters.riskLevel);
    }

    // Sort by timestamp (most recent first)
    filtered.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );

    // Apply pagination
    const offset = filters.offset || 0;
    const limit = filters.limit || 100;
    return filtered.slice(offset, offset + limit);
  }

  public getComplianceReport(tenantId?: string): any {
    const events = tenantId
      ? this.auditEvents.filter((e) => e.tenantId === tenantId)
      : this.auditEvents;

    const totalEvents = events.length;
    const riskDistribution = {
      LOW: events.filter((e) => e.riskLevel === "LOW").length,
      MEDIUM: events.filter((e) => e.riskLevel === "MEDIUM").length,
      HIGH: events.filter((e) => e.riskLevel === "HIGH").length,
      CRITICAL: events.filter((e) => e.riskLevel === "CRITICAL").length,
    };

    const complianceStats = {
      gdpr: events.filter((e) => e.compliance.gdpr).length,
      hipaa: events.filter((e) => e.compliance.hipaa).length,
      sox: events.filter((e) => e.compliance.sox).length,
      pci: events.filter((e) => e.compliance.pci).length,
    };

    return {
      totalEvents,
      riskDistribution,
      complianceStats,
      reportGeneratedAt: new Date().toISOString(),
      tenantId,
    };
  }
}

// Global audit trail manager
const auditTrailManager = new AuditTrailManager();

// Middleware for audit logging
export function auditMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const startTime = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    const auditEvent = auditTrailManager.createAuditEvent(req, res, duration);
    auditTrailManager.recordAuditEvent(auditEvent);
  });

  next();
}

// Export audit trail manager for external use
export { auditTrailManager };

// Express route handlers for audit trail API
export function handleAuditEventsRequest(req: Request, res: Response): void {
  const events = auditTrailManager.getAuditEvents(req.query as any);
  res.json({
    events,
    totalCount: events.length,
    filters: req.query,
  });
}

export function handleComplianceReportRequest(
  req: Request,
  res: Response,
): void {
  const tenantId = req.params.tenantId || (req.query.tenantId as string);
  const report = auditTrailManager.getComplianceReport(tenantId);
  res.json(report);
}
