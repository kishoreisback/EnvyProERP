import { Request, Response, NextFunction } from "express";
import { getLogger } from "../utils/logger";

interface MetricsData {
  httpRequests: Map<string, number>;
  httpDuration: Map<string, number[]>;
  tenantMetrics: Map<string, TenantMetrics>;
  businessMetrics: BusinessMetrics;
  securityEvents: SecurityEvent[];
  performanceMetrics: PerformanceMetrics[];
}

interface TenantMetrics {
  activeUsers: number;
  apiRequests: number;
  storageUsed: number;
  errors: number;
  responseTime: number[];
}

interface BusinessMetrics {
  totalRevenue: number;
  activeProjects: number;
  leadsConverted: number;
  customerSatisfaction: number;
}

interface SecurityEvent {
  timestamp: string;
  type: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  tenantId?: string;
  details: Record<string, any>;
}

interface PerformanceMetrics {
  timestamp: string;
  operation: string;
  duration: number;
  memoryUsage: number;
  cpuUsage: number;
  tenantId?: string;
}

class MetricsCollector {
  private metrics: MetricsData = {
    httpRequests: new Map(),
    httpDuration: new Map(),
    tenantMetrics: new Map(),
    businessMetrics: {
      totalRevenue: 0,
      activeProjects: 0,
      leadsConverted: 0,
      customerSatisfaction: 0,
    },
    securityEvents: [],
    performanceMetrics: [],
  };

  private logger = getLogger();

  public recordHttpRequest(
    method: string,
    path: string,
    statusCode: number,
    duration: number,
    tenantId?: string,
  ): void {
    const key = `${method}_${path}_${statusCode}`;
    const current = this.metrics.httpRequests.get(key) || 0;
    this.metrics.httpRequests.set(key, current + 1);

    const durationKey = `${method}_${path}`;
    const durations = this.metrics.httpDuration.get(durationKey) || [];
    durations.push(duration);
    this.metrics.httpDuration.set(durationKey, durations);

    // Record tenant-specific metrics
    if (tenantId) {
      this.updateTenantMetrics(tenantId, "apiRequest", {
        duration,
        statusCode,
      });
    }

    // Log slow requests
    if (duration > 1000) {
      this.logger.warn("METRICS", "Slow request detected", {
        method,
        path,
        duration,
        tenantId,
        statusCode,
      });
    }
  }

  public recordSecurityEvent(event: SecurityEvent): void {
    this.metrics.securityEvents.push(event);

    // Keep only last 1000 security events
    if (this.metrics.securityEvents.length > 1000) {
      this.metrics.securityEvents = this.metrics.securityEvents.slice(-1000);
    }

    this.logger.security({
      type: event.type,
      severity: event.severity,
      tenantId: event.tenantId || "",
      userId: "",
      ip: "",
      userAgent: "",
      timestamp: event.timestamp,
      details: event.details,
    });
  }

  public recordPerformanceMetric(metric: PerformanceMetrics): void {
    this.metrics.performanceMetrics.push(metric);

    // Keep only last 5000 performance metrics
    if (this.metrics.performanceMetrics.length > 5000) {
      this.metrics.performanceMetrics =
        this.metrics.performanceMetrics.slice(-5000);
    }

    this.logger.performance({
      component: "SYSTEM",
      operation: metric.operation,
      duration: metric.duration,
      timestamp: metric.timestamp,
      tenantId: metric.tenantId,
      metadata: {
        memoryUsage: metric.memoryUsage,
        cpuUsage: metric.cpuUsage,
      },
    });
  }

  public updateTenantMetrics(
    tenantId: string,
    metricType: string,
    data: Record<string, any>,
  ): void {
    const current = this.metrics.tenantMetrics.get(tenantId) || {
      activeUsers: 0,
      apiRequests: 0,
      storageUsed: 0,
      errors: 0,
      responseTime: [],
    };

    switch (metricType) {
      case "apiRequest":
        current.apiRequests += 1;
        current.responseTime.push(data.duration);
        if (data.statusCode >= 400) {
          current.errors += 1;
        }
        break;
      case "userLogin":
        current.activeUsers = Math.max(
          current.activeUsers,
          data.userCount || 0,
        );
        break;
      case "storageUpdate":
        current.storageUsed = data.bytes || 0;
        break;
    }

    this.metrics.tenantMetrics.set(tenantId, current);
  }

  public updateBusinessMetrics(updates: Partial<BusinessMetrics>): void {
    this.metrics.businessMetrics = {
      ...this.metrics.businessMetrics,
      ...updates,
    };
  }

  public getPrometheusMetrics(): string {
    let output = "";

    // HTTP request metrics
    output += "# HELP http_requests_total Total HTTP requests\n";
    output += "# TYPE http_requests_total counter\n";
    for (const [key, value] of this.metrics.httpRequests.entries()) {
      const [method, path, status] = key.split("_");
      output += `http_requests_total{method="${method}",path="${path}",status="${status}"} ${value}\n`;
    }

    // HTTP duration metrics
    output += "# HELP http_request_duration_seconds HTTP request duration\n";
    output += "# TYPE http_request_duration_seconds histogram\n";
    for (const [key, durations] of this.metrics.httpDuration.entries()) {
      const [method, path] = key.split("_");
      const sorted = durations.sort((a, b) => a - b);
      const p50 = sorted[Math.floor(sorted.length * 0.5)] || 0;
      const p95 = sorted[Math.floor(sorted.length * 0.95)] || 0;
      const p99 = sorted[Math.floor(sorted.length * 0.99)] || 0;

      output += `http_request_duration_seconds{method="${method}",path="${path}",quantile="0.5"} ${p50 / 1000}\n`;
      output += `http_request_duration_seconds{method="${method}",path="${path}",quantile="0.95"} ${p95 / 1000}\n`;
      output += `http_request_duration_seconds{method="${method}",path="${path}",quantile="0.99"} ${p99 / 1000}\n`;
    }

    // Tenant metrics
    output += "# HELP tenant_active_users Active users per tenant\n";
    output += "# TYPE tenant_active_users gauge\n";
    for (const [tenantId, metrics] of this.metrics.tenantMetrics.entries()) {
      output += `tenant_active_users{tenant_id="${tenantId}"} ${metrics.activeUsers}\n`;
      output += `tenant_api_requests_total{tenant_id="${tenantId}"} ${metrics.apiRequests}\n`;
      output += `tenant_storage_used_bytes{tenant_id="${tenantId}"} ${metrics.storageUsed}\n`;
      output += `tenant_errors_total{tenant_id="${tenantId}"} ${metrics.errors}\n`;

      if (metrics.responseTime.length > 0) {
        const avgResponseTime =
          metrics.responseTime.reduce((sum, time) => sum + time, 0) /
          metrics.responseTime.length;
        output += `tenant_avg_response_time_seconds{tenant_id="${tenantId}"} ${avgResponseTime / 1000}\n`;
      }
    }

    // Business metrics
    output += "# HELP business_total_revenue Total business revenue\n";
    output += "# TYPE business_total_revenue gauge\n";
    output += `business_total_revenue ${this.metrics.businessMetrics.totalRevenue}\n`;

    output += "# HELP business_active_projects Active projects count\n";
    output += "# TYPE business_active_projects gauge\n";
    output += `business_active_projects ${this.metrics.businessMetrics.activeProjects}\n`;

    // Security events
    output += "# HELP security_events_total Total security events\n";
    output += "# TYPE security_events_total counter\n";
    const securityEventCounts = new Map<string, number>();
    for (const event of this.metrics.securityEvents) {
      const key = `${event.type}_${event.severity}`;
      securityEventCounts.set(key, (securityEventCounts.get(key) || 0) + 1);
    }
    for (const [key, count] of securityEventCounts.entries()) {
      const [type, severity] = key.split("_");
      output += `security_events_total{type="${type}",severity="${severity}"} ${count}\n`;
    }

    return output;
  }

  public getTenantSpecificMetrics(tenantId: string): any {
    const tenantMetrics = this.metrics.tenantMetrics.get(tenantId);
    if (!tenantMetrics) {
      return null;
    }

    return {
      activeUsers: tenantMetrics.activeUsers,
      apiRequests: tenantMetrics.apiRequests,
      storageUsed: tenantMetrics.storageUsed,
      errors: tenantMetrics.errors,
      averageResponseTime:
        tenantMetrics.responseTime.length > 0
          ? tenantMetrics.responseTime.reduce((sum, time) => sum + time, 0) /
            tenantMetrics.responseTime.length
          : 0,
      recentSecurityEvents: this.metrics.securityEvents
        .filter((event) => event.tenantId === tenantId)
        .slice(-10),
      performanceMetrics: this.metrics.performanceMetrics
        .filter((metric) => metric.tenantId === tenantId)
        .slice(-50),
    };
  }

  public getSystemHealth(): any {
    const totalRequests = Array.from(this.metrics.httpRequests.values()).reduce(
      (sum, count) => sum + count,
      0,
    );

    const errorRequests = Array.from(this.metrics.httpRequests.entries())
      .filter(([key]) => key.includes("_5") || key.includes("_4"))
      .reduce((sum, [, count]) => sum + count, 0);

    const errorRate = totalRequests > 0 ? errorRequests / totalRequests : 0;

    return {
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      totalRequests,
      errorRate,
      activeTenants: this.metrics.tenantMetrics.size,
      totalUsers: Array.from(this.metrics.tenantMetrics.values()).reduce(
        (sum, metrics) => sum + metrics.activeUsers,
        0,
      ),
      lastSecurityEvent:
        this.metrics.securityEvents[this.metrics.securityEvents.length - 1],
      systemLoad: process.cpuUsage(),
    };
  }

  public reset(): void {
    this.metrics = {
      httpRequests: new Map(),
      httpDuration: new Map(),
      tenantMetrics: new Map(),
      businessMetrics: {
        totalRevenue: 0,
        activeProjects: 0,
        leadsConverted: 0,
        customerSatisfaction: 0,
      },
      securityEvents: [],
      performanceMetrics: [],
    };
  }
}

// Global metrics collector instance
const metricsCollector = new MetricsCollector();

// Middleware for collecting HTTP metrics
export function metricsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const startTime = Date.now();

  // Get tenant ID from request (assuming it's in headers or JWT)
  const tenantId =
    (req.headers["x-tenant-id"] as string) ||
    req.body?.tenantId ||
    (req.query?.tenantId as string);

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    metricsCollector.recordHttpRequest(
      req.method,
      req.route?.path || req.path,
      res.statusCode,
      duration,
      tenantId,
    );
  });

  next();
}

// Export metrics collector for use in other modules
export { metricsCollector };

// Express route handlers for metrics endpoints
export function handleMetricsRequest(req: Request, res: Response): void {
  res.set("Content-Type", "text/plain");
  res.send(metricsCollector.getPrometheusMetrics());
}

export function handleTenantMetricsRequest(req: Request, res: Response): void {
  const tenantId = req.params.tenantId || (req.query.tenantId as string);

  if (!tenantId) {
    res.status(400).json({ error: "Tenant ID required" });
    return;
  }

  const metrics = metricsCollector.getTenantSpecificMetrics(tenantId);
  if (!metrics) {
    res.status(404).json({ error: "Tenant not found" });
    return;
  }

  res.json(metrics);
}

export function handleSystemHealthRequest(req: Request, res: Response): void {
  const health = metricsCollector.getSystemHealth();
  res.json(health);
}

export function handleBusinessMetricsRequest(
  req: Request,
  res: Response,
): void {
  // This would typically fetch real business metrics from database
  const mockBusinessMetrics = {
    totalRevenue: 2500000,
    activeProjects: 45,
    leadsConverted: 120,
    customerSatisfaction: 4.7,
    growthRate: 15.3,
    churnRate: 2.1,
  };

  metricsCollector.updateBusinessMetrics(mockBusinessMetrics);
  res.json(mockBusinessMetrics);
}
