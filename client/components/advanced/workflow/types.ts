export type WorkflowNodeType =
  | "start"
  | "action"
  | "condition"
  | "approval"
  | "notification"
  | "delay"
  | "data"
  | "integration"
  | "end";

export type WorkflowTriggerType =
  | "manual"
  | "form_submission"
  | "schedule"
  | "webhook"
  | "email"
  | "file_upload";

export interface WorkflowNodePosition {
  x: number;
  y: number;
}

export interface WorkflowConnection {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  sourceHandle?: string;
  targetHandle?: string;
  label?: string;
  condition?: string;
}

export interface WorkflowNodeData {
  label: string;
  description?: string;
  config: Record<string, any>;
  inputs?: WorkflowNodeInput[];
  outputs?: WorkflowNodeOutput[];
}

export interface WorkflowNodeInput {
  id: string;
  name: string;
  type: "string" | "number" | "boolean" | "object" | "array";
  required?: boolean;
  defaultValue?: any;
}

export interface WorkflowNodeOutput {
  id: string;
  name: string;
  type: "string" | "number" | "boolean" | "object" | "array";
}

export interface WorkflowNode {
  id: string;
  type: WorkflowNodeType;
  position: WorkflowNodePosition;
  data: WorkflowNodeData;
  selected?: boolean;
  dragging?: boolean;
}

export interface WorkflowSchema {
  id: string;
  name: string;
  description?: string;
  version: string;
  trigger: WorkflowTriggerType;
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
  variables?: WorkflowVariable[];
  settings: WorkflowSettings;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface WorkflowVariable {
  id: string;
  name: string;
  type: "string" | "number" | "boolean" | "object" | "array";
  defaultValue?: any;
  description?: string;
}

export interface WorkflowSettings {
  autoSave: boolean;
  enableLogging: boolean;
  maxExecutionTime: number;
  retryPolicy: {
    enabled: boolean;
    maxRetries: number;
    retryDelay: number;
  };
  notifications: {
    onSuccess: boolean;
    onFailure: boolean;
    onTimeout: boolean;
  };
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: "running" | "completed" | "failed" | "cancelled";
  startTime: Date;
  endTime?: Date;
  duration?: number;
  logs: WorkflowExecutionLog[];
  variables: Record<string, any>;
  error?: string;
}

export interface WorkflowExecutionLog {
  id: string;
  nodeId: string;
  timestamp: Date;
  level: "info" | "warning" | "error";
  message: string;
  data?: any;
}

export interface NodeTemplate {
  type: WorkflowNodeType;
  label: string;
  description: string;
  icon: string;
  category: string;
  defaultData: WorkflowNodeData;
  configSchema: NodeConfigField[];
}

export interface NodeConfigField {
  key: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "number"
    | "select"
    | "checkbox"
    | "email"
    | "url";
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
  placeholder?: string;
  description?: string;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

export interface WorkflowBuilderState {
  workflow: WorkflowSchema | null;
  selectedNodeId: string | null;
  isExecuting: boolean;
  zoom: number;
  pan: { x: number; y: number };
  mode: "design" | "execute" | "debug";
  showGrid: boolean;
  showMinimap: boolean;
}
