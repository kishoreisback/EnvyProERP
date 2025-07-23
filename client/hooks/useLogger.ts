import { useCallback, useContext } from "react";
import {
  LogEntry,
  LogLevelType,
  PerformanceMetrics,
  SecurityEvent,
} from "../../shared/logging";

// Client-side logger context
interface ClientLoggerContext {
  tenantId?: string;
  userId?: string;
  sessionId: string;
}

class ClientLogger {
  private context: ClientLoggerContext;
  private buffer: LogEntry[] = [];
  private batchSize = 10;
  private flushInterval = 5000; // 5 seconds

  constructor(context: ClientLoggerContext) {
    this.context = context;
    this.startBatchFlush();
  }

  private startBatchFlush(): void {
    setInterval(() => {
      this.flush();
    }, this.flushInterval);
  }

  private createLogEntry(
    level: LogLevelType,
    component: string,
    message: string,
    metadata?: Record<string, any>,
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      component,
      message,
      metadata,
      tenantId: this.context.tenantId,
      userId: this.context.userId,
      sessionId: this.context.sessionId,
      traceId: this.generateTraceId(),
    };
  }

  private generateTraceId(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  private addToBuffer(entry: LogEntry): void {
    this.buffer.push(entry);

    // Immediate flush for errors and fatal logs
    if (entry.level === "ERROR" || entry.level === "FATAL") {
      this.flush();
    } else if (this.buffer.length >= this.batchSize) {
      this.flush();
    }
  }

  private async flush(): Promise<void> {
    if (this.buffer.length === 0) return;

    const logsToSend = [...this.buffer];
    this.buffer = [];

    try {
      const response = await fetch("/api/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          logs: logsToSend,
          clientInfo: {
            userAgent: navigator.userAgent,
            url: window.location.href,
            timestamp: new Date().toISOString(),
          },
        }),
      });

      // If API endpoint doesn't exist (404), just log locally and continue
      if (response.status === 404) {
        if (process.env.NODE_ENV === "development") {
          console.log("Audit logs (API endpoint not available):", logsToSend);
        }
        return; // Don't add back to buffer for 404s
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      // Only add logs back to buffer for actual network errors, not 404s
      if (
        error instanceof TypeError ||
        (error instanceof Error && !error.message.includes("404"))
      ) {
        this.buffer.unshift(...logsToSend);
      }

      // Suppress 404 errors in production, show others
      if (
        process.env.NODE_ENV === "development" ||
        !(error instanceof Error && error.message.includes("404"))
      ) {
        console.error("Failed to send logs to server:", error);
      }
    }
  }

  public log(
    level: LogLevelType,
    component: string,
    message: string,
    metadata?: Record<string, any>,
  ): void {
    const entry = this.createLogEntry(level, component, message, metadata);

    // Console output for development
    if (process.env.NODE_ENV === "development") {
      const consoleMethod =
        level === "ERROR" || level === "FATAL"
          ? "error"
          : level === "WARN"
            ? "warn"
            : "log";
      console[consoleMethod](`[${level}] ${component}: ${message}`, metadata);
    }

    this.addToBuffer(entry);
  }

  public performance(metrics: PerformanceMetrics): void {
    const entry = this.createLogEntry(
      "INFO",
      "PERFORMANCE",
      `${metrics.operation} completed in ${metrics.duration}ms`,
      { ...metrics, type: "performance" },
    );
    this.addToBuffer(entry);
  }

  public userAction(
    action: string,
    component: string,
    metadata?: Record<string, any>,
  ): void {
    const entry = this.createLogEntry(
      "INFO",
      "USER_ACTION",
      `User performed action: ${action}`,
      {
        ...metadata,
        action,
        component,
        type: "user_action",
        url: window.location.href,
      },
    );
    this.addToBuffer(entry);
  }

  public error(
    component: string,
    message: string,
    error?: Error,
    metadata?: Record<string, any>,
  ): void {
    const entry = this.createLogEntry("ERROR", component, message, {
      ...metadata,
      error: error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : undefined,
    });
    this.addToBuffer(entry);
  }

  public security(
    event: Omit<SecurityEvent, "ip" | "userAgent" | "timestamp">,
  ): void {
    const securityEntry = this.createLogEntry(
      "WARN",
      "SECURITY",
      `Security event: ${event.type}`,
      {
        ...event,
        type: "security_event",
        url: window.location.href,
      },
    );
    this.addToBuffer(securityEntry);
  }

  // Utility methods
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

  public fatal(
    component: string,
    message: string,
    metadata?: Record<string, any>,
  ): void {
    this.log("FATAL", component, message, metadata);
  }
}

let clientLogger: ClientLogger | null = null;

export function useLogger(tenantId?: string, userId?: string) {
  const initializeLogger = useCallback(() => {
    if (!clientLogger) {
      clientLogger = new ClientLogger({
        tenantId,
        userId,
        sessionId: sessionStorage.getItem("sessionId") || generateSessionId(),
      });
    }
    return clientLogger;
  }, [tenantId, userId]);

  const logger = initializeLogger();

  const logUserAction = useCallback(
    (action: string, component: string, metadata?: Record<string, any>) => {
      logger.userAction(action, component, metadata);
    },
    [logger],
  );

  const logPerformance = useCallback(
    (operation: string, duration: number, metadata?: Record<string, any>) => {
      logger.performance({
        component: "CLIENT",
        operation,
        duration,
        timestamp: new Date().toISOString(),
        tenantId,
        userId,
        metadata,
      });
    },
    [logger, tenantId, userId],
  );

  const logError = useCallback(
    (
      component: string,
      message: string,
      error?: Error,
      metadata?: Record<string, any>,
    ) => {
      logger.error(component, message, error, metadata);
    },
    [logger],
  );

  const logSecurityEvent = useCallback(
    (event: Omit<SecurityEvent, "ip" | "userAgent" | "timestamp">) => {
      logger.security(event);
    },
    [logger],
  );

  return {
    logger,
    logUserAction,
    logPerformance,
    logError,
    logSecurityEvent,
    trace: logger.trace.bind(logger),
    debug: logger.debug.bind(logger),
    info: logger.info.bind(logger),
    warn: logger.warn.bind(logger),
    error: logError,
    fatal: logger.fatal.bind(logger),
  };
}

function generateSessionId(): string {
  const sessionId =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  sessionStorage.setItem("sessionId", sessionId);
  return sessionId;
}

// Performance monitoring HOC for React components
export function withPerformanceLogging<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string,
): React.ComponentType<P> {
  return function PerformanceLoggedComponent(props: P) {
    const { logPerformance } = useLogger();
    const startTime = Date.now();

    React.useEffect(() => {
      const endTime = Date.now();
      logPerformance(`${componentName} render`, endTime - startTime, {
        component: componentName,
        props: Object.keys(props as any).length,
      });
    });

    return React.createElement(Component, props);
  };
}
