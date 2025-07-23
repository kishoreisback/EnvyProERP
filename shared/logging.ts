export interface LogLevel {
  TRACE: 0;
  DEBUG: 1;
  INFO: 2;
  WARN: 3;
  ERROR: 4;
  FATAL: 5;
}

export type LogLevelType = keyof LogLevel;

export interface LogEntry {
  timestamp: string;
  level: LogLevelType;
  tenantId?: string;
  userId?: string;
  sessionId?: string;
  component: string;
  message: string;
  metadata?: Record<string, any>;
  traceId?: string;
  spanId?: string;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
  performance?: {
    duration: number;
    memory: number;
    operation: string;
  };
  security?: {
    ip: string;
    userAgent: string;
    action: string;
    resource: string;
  };
}

export interface AuditLogEntry extends LogEntry {
  auditType: "USER_ACTION" | "SYSTEM_EVENT" | "DATA_CHANGE" | "SECURITY_EVENT";
  entityType?: string;
  entityId?: string;
  before?: Record<string, any>;
  after?: Record<string, any>;
  compliance: {
    gdpr: boolean;
    hipaa: boolean;
    sox: boolean;
  };
}

export interface TenantLogContext {
  tenantId: string;
  tenantName: string;
  environment: string;
  tier: string;
}

export interface LoggerConfig {
  level: LogLevelType;
  enableConsole: boolean;
  enableFile: boolean;
  enableRemote: boolean;
  filePath?: string;
  remoteEndpoint?: string;
  tenantContext?: TenantLogContext;
  maxFileSize: number;
  retentionDays: number;
}

export interface PerformanceMetrics {
  component: string;
  operation: string;
  duration: number;
  timestamp: string;
  tenantId?: string;
  userId?: string;
  metadata?: Record<string, any>;
}

export interface SecurityEvent {
  type:
    | "LOGIN_ATTEMPT"
    | "LOGIN_SUCCESS"
    | "LOGIN_FAILURE"
    | "ACCESS_DENIED"
    | "PASSWORD_CHANGE"
    | "PERMISSION_ESCALATION"
    | "DATA_ACCESS"
    | "DATA_EXPORT";
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  tenantId?: string;
  userId?: string;
  ip: string;
  userAgent: string;
  timestamp: string;
  details: Record<string, any>;
}
