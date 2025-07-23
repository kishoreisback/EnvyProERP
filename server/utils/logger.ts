import { writeFileSync, appendFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import {
  LogEntry,
  AuditLogEntry,
  LoggerConfig,
  LogLevelType,
  PerformanceMetrics,
  SecurityEvent,
} from "../../shared/logging";

export class TenantLogger {
  private config: LoggerConfig;
  private logDir: string;

  constructor(config: LoggerConfig) {
    this.config = config;
    this.logDir = join(process.cwd(), "logs");
    this.ensureLogDirectory();
  }

  private ensureLogDirectory(): void {
    if (!existsSync(this.logDir)) {
      mkdirSync(this.logDir, { recursive: true });
    }
  }

  private getLevelPriority(level: LogLevelType): number {
    const levels = { TRACE: 0, DEBUG: 1, INFO: 2, WARN: 3, ERROR: 4, FATAL: 5 };
    return levels[level];
  }

  private shouldLog(level: LogLevelType): boolean {
    return (
      this.getLevelPriority(level) >= this.getLevelPriority(this.config.level)
    );
  }

  private formatLogEntry(entry: LogEntry): string {
    return (
      JSON.stringify({
        ...entry,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development",
        pid: process.pid,
        hostname: process.env.HOSTNAME || "localhost",
      }) + "\n"
    );
  }

  private writeToFile(entry: LogEntry, filename: string): void {
    if (!this.config.enableFile) return;

    const filePath = join(this.logDir, filename);
    const formattedEntry = this.formatLogEntry(entry);

    try {
      appendFileSync(filePath, formattedEntry, "utf8");
    } catch (error) {
      console.error("Failed to write log to file:", error);
    }
  }

  private sendToRemote(entry: LogEntry): void {
    if (!this.config.enableRemote || !this.config.remoteEndpoint) return;

    // In a real implementation, this would send to logging services like:
    // - ELK Stack (Elasticsearch, Logstash, Kibana)
    // - Splunk
    // - CloudWatch
    // - Datadog
    // - New Relic

    const payload = {
      ...entry,
      service: "buildpro-erp",
      version: process.env.APP_VERSION || "1.0.0",
      environment: process.env.NODE_ENV || "development",
    };

    // Simulate remote logging (replace with actual implementation)
    fetch(this.config.remoteEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch((error) => {
      console.error("Failed to send log to remote endpoint:", error);
    });
  }

  public log(
    level: LogLevelType,
    component: string,
    message: string,
    metadata?: Record<string, any>,
  ): void {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      component,
      message,
      metadata,
      tenantId: this.config.tenantContext?.tenantId,
      traceId: this.generateTraceId(),
    };

    // Console output
    if (this.config.enableConsole) {
      const consoleMethod =
        level === "ERROR" || level === "FATAL"
          ? "error"
          : level === "WARN"
            ? "warn"
            : "log";
      console[consoleMethod](this.formatLogEntry(entry));
    }

    // File output
    const filename = `${level.toLowerCase()}-${new Date().toISOString().split("T")[0]}.log`;
    this.writeToFile(entry, filename);

    // Remote logging
    this.sendToRemote(entry);
  }

  public audit(auditEntry: Omit<AuditLogEntry, "timestamp" | "level">): void {
    const entry: AuditLogEntry = {
      ...auditEntry,
      timestamp: new Date().toISOString(),
      level: "INFO",
      tenantId: this.config.tenantContext?.tenantId,
      traceId: this.generateTraceId(),
    };

    // Always log audit entries regardless of log level
    const filename = `audit-${entry.tenantId || "system"}-${new Date().toISOString().split("T")[0]}.log`;
    this.writeToFile(entry, filename);
    this.sendToRemote(entry);

    // Also store in audit-specific storage
    this.storeAuditEntry(entry);
  }

  public performance(metrics: PerformanceMetrics): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: "INFO",
      component: "PERFORMANCE",
      message: `${metrics.operation} completed in ${metrics.duration}ms`,
      metadata: metrics,
      tenantId: metrics.tenantId,
      performance: {
        duration: metrics.duration,
        memory: process.memoryUsage().heapUsed,
        operation: metrics.operation,
      },
    };

    const filename = `performance-${new Date().toISOString().split("T")[0]}.log`;
    this.writeToFile(entry, filename);
    this.sendToRemote(entry);
  }

  public security(event: SecurityEvent): void {
    const entry: LogEntry = {
      timestamp: event.timestamp,
      level:
        event.severity === "CRITICAL"
          ? "FATAL"
          : event.severity === "HIGH"
            ? "ERROR"
            : event.severity === "MEDIUM"
              ? "WARN"
              : "INFO",
      component: "SECURITY",
      message: `Security event: ${event.type}`,
      metadata: event.details,
      tenantId: event.tenantId,
      security: {
        ip: event.ip,
        userAgent: event.userAgent,
        action: event.type,
        resource: "SYSTEM",
      },
    };

    // Security events always get logged
    const filename = `security-${new Date().toISOString().split("T")[0]}.log`;
    this.writeToFile(entry, filename);
    this.sendToRemote(entry);

    // Alert on high-severity events
    if (event.severity === "HIGH" || event.severity === "CRITICAL") {
      this.sendSecurityAlert(event);
    }
  }

  private generateTraceId(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  private storeAuditEntry(entry: AuditLogEntry): void {
    // In production, this would store in a dedicated audit database
    // with encryption and tamper-proof storage
    const auditFile = join(this.logDir, "audit-trail.log");
    this.writeToFile(entry, "audit-trail.log");
  }

  private sendSecurityAlert(event: SecurityEvent): void {
    // In production, this would integrate with:
    // - PagerDuty
    // - Slack
    // - Email alerts
    // - SIEM systems
    console.error("🚨 SECURITY ALERT:", event);
  }

  // Utility methods for different log levels
  public trace(
    component: string,
    message: string,
    metadata?: Record<string, any>,
  ): void {
    this.log("TRACE", component, message, metadata);
  }

  public debug(
    component: string,
    message: string,
    metadata?: Record<string, any>,
  ): void {
    this.log("DEBUG", component, message, metadata);
  }

  public info(
    component: string,
    message: string,
    metadata?: Record<string, any>,
  ): void {
    this.log("INFO", component, message, metadata);
  }

  public warn(
    component: string,
    message: string,
    metadata?: Record<string, any>,
  ): void {
    this.log("WARN", component, message, metadata);
  }

  public error(
    component: string,
    message: string,
    error?: Error,
    metadata?: Record<string, any>,
  ): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: "ERROR",
      component,
      message,
      metadata,
      tenantId: this.config.tenantContext?.tenantId,
      error: error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : undefined,
      traceId: this.generateTraceId(),
    };

    const filename = `error-${new Date().toISOString().split("T")[0]}.log`;
    this.writeToFile(entry, filename);
    this.sendToRemote(entry);
  }

  public fatal(
    component: string,
    message: string,
    error?: Error,
    metadata?: Record<string, any>,
  ): void {
    this.log("FATAL", component, message, { ...metadata, error: error?.stack });
  }
}

// Global logger instance
let globalLogger: TenantLogger;

export function initializeLogger(config: LoggerConfig): TenantLogger {
  globalLogger = new TenantLogger(config);
  return globalLogger;
}

export function getLogger(): TenantLogger {
  if (!globalLogger) {
    // Initialize with default config if not already initialized
    globalLogger = new TenantLogger({
      level: "INFO",
      enableConsole: true,
      enableFile: true,
      enableRemote: false,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      retentionDays: 30,
    });
  }
  return globalLogger;
}

// Performance monitoring wrapper
export function withPerformanceLogging<T extends (...args: any[]) => any>(
  operation: string,
  fn: T,
  tenantId?: string,
): T {
  return ((...args: any[]) => {
    const start = Date.now();
    const result = fn(...args);

    if (result instanceof Promise) {
      return result.finally(() => {
        const duration = Date.now() - start;
        getLogger().performance({
          component: "ASYNC_OPERATION",
          operation,
          duration,
          timestamp: new Date().toISOString(),
          tenantId,
        });
      });
    } else {
      const duration = Date.now() - start;
      getLogger().performance({
        component: "SYNC_OPERATION",
        operation,
        duration,
        timestamp: new Date().toISOString(),
        tenantId,
      });
      return result;
    }
  }) as T;
}
