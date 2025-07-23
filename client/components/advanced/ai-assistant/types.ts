import { FormSchema, FieldSchema } from "../forms/types";

// AI Assistant Message Types
export interface AIMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  metadata?: {
    formSchema?: FormSchema;
    suggestions?: AISuggestion[];
    confidence?: number;
    processingTime?: number;
  };
}

// AI Suggestion Types
export interface AISuggestion {
  id: string;
  type:
    | "field_suggestion"
    | "validation_rule"
    | "form_optimization"
    | "field_improvement"
    | "layout_suggestion"
    | "completion_prediction";
  title: string;
  description: string;
  confidence: number;
  impact: "low" | "medium" | "high";
  category:
    | "usability"
    | "performance"
    | "validation"
    | "design"
    | "compliance";
  action: {
    type:
      | "add_field"
      | "modify_field"
      | "add_validation"
      | "change_layout"
      | "optimize";
    payload: any;
  };
  reasoning: string;
}

// AI Analysis Results
export interface FormAnalysisResult {
  score: number;
  completionRate: number;
  usabilityScore: number;
  performanceScore: number;
  complianceScore: number;
  suggestions: AISuggestion[];
  insights: {
    fieldCount: number;
    estimatedCompletionTime: number;
    complexityLevel: "simple" | "moderate" | "complex";
    recommendedImprovements: string[];
  };
}

// AI Form Generation Context
export interface FormGenerationContext {
  industry?: "construction" | "finance" | "hr" | "sales" | "general";
  purpose: string;
  targetUsers?: string[];
  requiredFields?: string[];
  compliance?: string[];
  locale?: string;
  preferredLayout?: "vertical" | "horizontal" | "grid";
}

// AI Intent Recognition
export interface RecognizedIntent {
  intent:
    | "create_form"
    | "analyze_form"
    | "suggest_improvements"
    | "add_field"
    | "modify_field"
    | "optimize_validation"
    | "explain_feature"
    | "generate_template";
  confidence: number;
  entities: {
    formType?: string;
    fieldTypes?: string[];
    industry?: string;
    requirements?: string[];
    modifications?: string[];
  };
  context: FormGenerationContext;
}

// AI Field Suggestions
export interface FieldSuggestion {
  fieldSchema: FieldSchema;
  reasoning: string;
  confidence: number;
  alternatives: FieldSchema[];
  bestPractices: string[];
}

// AI Validation Suggestions
export interface ValidationSuggestion {
  fieldName: string;
  rules: Array<{
    type: string;
    rule: any;
    reasoning: string;
    importance: "critical" | "recommended" | "optional";
  }>;
}

// AI Assistant State
export interface AIAssistantState {
  isActive: boolean;
  isThinking: boolean;
  currentContext?: FormGenerationContext;
  conversationHistory: AIMessage[];
  currentForm?: FormSchema;
  suggestions: AISuggestion[];
  analysisResults?: FormAnalysisResult;
}

// Pre-built AI Prompts
export const AI_PROMPTS = {
  FORM_GENERATION: {
    EMPLOYEE_ONBOARDING:
      "Create a comprehensive employee onboarding form for an Indian construction company",
    PROJECT_REQUEST:
      "Generate a project request form with budget approval workflow",
    CUSTOMER_FEEDBACK:
      "Build a customer satisfaction survey with rating scales",
    EXPENSE_CLAIM: "Create an expense reimbursement form with receipt upload",
    LEAVE_APPLICATION:
      "Generate a leave application form with manager approval",
    SUPPLIER_REGISTRATION:
      "Build a vendor registration form with compliance fields",
    SAFETY_INSPECTION: "Create a construction site safety inspection checklist",
    PERFORMANCE_REVIEW: "Generate an employee performance evaluation form",
  },
  OPTIMIZATION: {
    REDUCE_FIELDS: "How can I simplify this form to improve completion rates?",
    IMPROVE_VALIDATION: "Suggest better validation rules for data quality",
    ENHANCE_UX: "How can I make this form more user-friendly?",
    MOBILE_OPTIMIZE: "Optimize this form for mobile devices",
    ACCESSIBILITY: "Make this form more accessible for all users",
  },
  ANALYSIS: {
    COMPLETION_RATE: "Analyze why users might abandon this form",
    FIELD_ANALYSIS: "Which fields are causing the most errors?",
    PERFORMANCE: "How can I improve form loading and submission speed?",
    COMPLIANCE: "Check this form for Indian regulatory compliance",
  },
};

// AI Model Configurations
export interface AIModelConfig {
  model: "gpt-4" | "claude-3" | "local-llm";
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  capabilities: {
    formGeneration: boolean;
    fieldSuggestion: boolean;
    validation: boolean;
    optimization: boolean;
    analysis: boolean;
  };
}

// AI Assistant Configuration
export const AI_CONFIG: AIModelConfig = {
  model: "gpt-4",
  temperature: 0.7,
  maxTokens: 2000,
  systemPrompt: `You are an AI Form Builder Assistant for an Indian ERP application. You help users create, optimize, and analyze business forms. 

Key Capabilities:
- Generate complete forms from natural language descriptions
- Suggest optimal field types and validation rules
- Provide form optimization recommendations
- Analyze form usability and completion rates
- Ensure Indian compliance (GST, labor laws, etc.)
- Support construction, finance, HR, and sales use cases

Always provide practical, actionable suggestions with clear reasoning. Consider Indian business context, regulations, and user experience best practices.`,
  capabilities: {
    formGeneration: true,
    fieldSuggestion: true,
    validation: true,
    optimization: true,
    analysis: true,
  },
};

// Common AI Responses
export const AI_RESPONSES = {
  GREETING:
    "Hello! I'm your AI Form Builder Assistant. I can help you create forms, suggest improvements, and optimize user experience. What would you like to build today?",
  THINKING: "Let me analyze your request and generate suggestions...",
  ERROR:
    "I encountered an issue processing your request. Please try rephrasing or providing more details.",
  SUCCESS: "Great! I've generated suggestions based on your requirements.",
  CLARIFICATION:
    "Could you provide more details about your specific requirements?",
};

// AI Learning Data Types
export interface AILearningData {
  formUsage: {
    formId: string;
    completionRate: number;
    abandonnmentPoints: string[];
    userFeedback: number;
    timeToComplete: number;
  };
  fieldPerformance: {
    fieldType: string;
    errorRate: number;
    userSatisfaction: number;
    completionTime: number;
  };
  optimizationResults: {
    originalScore: number;
    optimizedScore: number;
    improvementAreas: string[];
    userFeedback: string[];
  };
}

// AI Workflow Steps
export interface AIWorkflowStep {
  id: string;
  name: string;
  description: string;
  status: "pending" | "processing" | "completed" | "error";
  result?: any;
  duration?: number;
}

export interface AIWorkflow {
  id: string;
  type: "form_generation" | "form_analysis" | "optimization" | "suggestion";
  steps: AIWorkflowStep[];
  startTime: Date;
  endTime?: Date;
  result?: FormSchema | FormAnalysisResult | AISuggestion[];
}
