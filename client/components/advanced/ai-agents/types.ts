export type AIAgentType =
  | "document_processor"
  | "risk_analyzer"
  | "cost_predictor"
  | "safety_monitor"
  | "vendor_analyzer"
  | "scheduler"
  | "report_generator"
  | "compliance_checker"
  | "quality_inspector"
  | "smart_assistant";

export type AIAgentStatus = "active" | "inactive" | "processing" | "error";

export type AIAgentTrigger =
  | "document_upload"
  | "project_update"
  | "schedule_change"
  | "cost_threshold"
  | "safety_incident"
  | "vendor_event"
  | "manual"
  | "api_call"
  | "time_based";

export interface AIAgentCapability {
  id: string;
  name: string;
  description: string;
  inputTypes: string[];
  outputTypes: string[];
  confidence?: number;
}

export interface AIAgentConfig {
  enabled: boolean;
  autoExecute: boolean;
  confidenceThreshold: number;
  maxProcessingTime: number;
  retryAttempts: number;
  escalationRules: {
    lowConfidence: boolean;
    errors: boolean;
    timeout: boolean;
  };
  integrations: {
    email: boolean;
    slack: boolean;
    crm: boolean;
    hrms: boolean;
  };
  customPrompts?: string[];
  modelSettings?: {
    temperature: number;
    maxTokens: number;
    model: string;
  };
}

export interface AIAgentResult {
  id: string;
  agentId: string;
  executionId: string;
  status: "success" | "error" | "warning" | "pending";
  confidence: number;
  data: any;
  insights: string[];
  recommendations: AIRecommendation[];
  processedAt: Date;
  processingTime: number;
  metadata?: Record<string, any>;
}

export interface AIRecommendation {
  id: string;
  type: "action" | "alert" | "optimization" | "risk";
  priority: "low" | "medium" | "high" | "critical";
  title: string;
  description: string;
  suggestedAction?: string;
  impact?: {
    cost: number;
    time: number;
    risk: number;
  };
  autoApplicable: boolean;
  deadline?: Date;
}

export interface AIAgent {
  id: string;
  name: string;
  type: AIAgentType;
  description: string;
  status: AIAgentStatus;
  capabilities: AIAgentCapability[];
  config: AIAgentConfig;
  triggers: AIAgentTrigger[];
  lastExecuted?: Date;
  executionCount: number;
  successRate: number;
  averageProcessingTime: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AIAgentExecution {
  id: string;
  agentId: string;
  trigger: AIAgentTrigger;
  status: "running" | "completed" | "failed" | "cancelled";
  startTime: Date;
  endTime?: Date;
  duration?: number;
  inputData: any;
  result?: AIAgentResult;
  error?: string;
  logs: AIExecutionLog[];
}

export interface AIExecutionLog {
  id: string;
  timestamp: Date;
  level: "info" | "warning" | "error" | "debug";
  message: string;
  data?: any;
  component?: string;
}

export interface AIAutomationRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  conditions: AIAutomationCondition[];
  actions: AIAutomationAction[];
  agentIds: string[];
  priority: number;
  cooldownPeriod: number; // minutes
  lastTriggered?: Date;
  executionCount: number;
}

export interface AIAutomationCondition {
  id: string;
  type: "data_change" | "threshold" | "time" | "event" | "ai_result";
  field: string;
  operator: "equals" | "greater_than" | "less_than" | "contains" | "regex";
  value: any;
  aiAgent?: string;
  confidence?: number;
}

export interface AIAutomationAction {
  id: string;
  type:
    | "execute_agent"
    | "send_notification"
    | "create_task"
    | "update_record"
    | "generate_report"
    | "trigger_workflow";
  config: Record<string, any>;
  delayMinutes?: number;
}

export interface AIInsight {
  id: string;
  agentId: string;
  type: "trend" | "anomaly" | "prediction" | "opportunity" | "risk";
  title: string;
  description: string;
  confidence: number;
  impact: "low" | "medium" | "high" | "critical";
  category: string;
  data: any;
  visualizations?: {
    type: "chart" | "table" | "metric" | "graph";
    config: any;
  }[];
  generatedAt: Date;
  expiresAt?: Date;
}

export interface AIAgentTemplate {
  type: AIAgentType;
  name: string;
  description: string;
  icon: string;
  category: string;
  complexity: "simple" | "intermediate" | "advanced";
  defaultConfig: AIAgentConfig;
  capabilities: AIAgentCapability[];
  triggers: AIAgentTrigger[];
  useCases: string[];
  setupSteps: string[];
  requiredIntegrations: string[];
}

export interface AIModelProvider {
  id: string;
  name: string;
  type: "openai" | "anthropic" | "local" | "custom";
  models: {
    id: string;
    name: string;
    description: string;
    capabilities: string[];
    costPerToken: number;
    maxTokens: number;
  }[];
  config: {
    apiKey?: string;
    endpoint?: string;
    headers?: Record<string, string>;
  };
  status: "connected" | "disconnected" | "error";
}

export interface AIAgentDashboard {
  totalAgents: number;
  activeAgents: number;
  totalExecutions: number;
  successRate: number;
  averageProcessingTime: number;
  costSavings: number;
  timesSaved: number;
  criticalAlerts: number;
  recentInsights: AIInsight[];
  topPerformingAgents: AIAgent[];
  upcomingTasks: any[];
}
