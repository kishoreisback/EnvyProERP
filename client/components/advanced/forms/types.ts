import { z } from "zod";

// Field Types
export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "textarea"
  | "select"
  | "multiselect"
  | "checkbox"
  | "radio"
  | "date"
  | "time"
  | "datetime"
  | "file"
  | "currency"
  | "phone"
  | "url"
  | "range"
  | "switch"
  | "rating"
  | "color"
  | "richtext"
  | "signature"
  | "address"
  | "section"
  | "divider";

// Field Options
export interface FieldOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  description?: string;
}

// Validation Rules
export interface ValidationRule {
  type: "required" | "min" | "max" | "email" | "pattern" | "custom";
  value?: any;
  message: string;
}

// Conditional Logic
export interface ConditionalLogic {
  field: string;
  operator:
    | "equals"
    | "not_equals"
    | "greater_than"
    | "less_than"
    | "contains"
    | "is_empty"
    | "is_not_empty";
  value: any;
  action: "show" | "hide" | "enable" | "disable" | "require";
}

// Field Schema
export interface FieldSchema {
  id: string;
  type: FieldType;
  label: string;
  name: string;
  placeholder?: string;
  description?: string;
  defaultValue?: any;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;

  // Field-specific properties
  options?: FieldOption[];
  multiple?: boolean;
  min?: number;
  max?: number;
  step?: number;
  pattern?: string;
  accept?: string;
  rows?: number;
  cols?: number;

  // Layout
  width?: "full" | "half" | "quarter" | "third" | "two-thirds";
  className?: string;

  // Validation
  validation?: ValidationRule[];

  // Conditional Logic
  conditionalLogic?: ConditionalLogic[];

  // Dynamic Properties
  dataSource?: {
    type: "static" | "api" | "computed";
    url?: string;
    params?: Record<string, any>;
    transformer?: string;
  };
}

// Form Section
export interface FormSection {
  id: string;
  title: string;
  description?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  fields: FieldSchema[];
  conditionalLogic?: ConditionalLogic[];
}

// Form Schema
export interface FormSchema {
  id: string;
  title: string;
  description?: string;
  version: string;

  // Layout
  layout: "vertical" | "horizontal" | "grid";
  columns?: number;

  // Sections or flat fields
  sections?: FormSection[];
  fields?: FieldSchema[];

  // Form-level settings
  settings: {
    showProgress?: boolean;
    allowDraft?: boolean;
    autoSave?: boolean;
    submitText?: string;
    resetText?: string;
    cancelText?: string;
    multiStep?: boolean;
    submitOnEnter?: boolean;
    validateOnChange?: boolean;
  };

  // Styling
  theme?: {
    primaryColor?: string;
    borderRadius?: string;
    spacing?: string;
    fontSize?: string;
  };

  // Actions
  onSubmit?: {
    type: "api" | "redirect" | "custom";
    url?: string;
    method?: "POST" | "PUT" | "PATCH";
    successMessage?: string;
    errorMessage?: string;
    redirectUrl?: string;
  };
}

// Form State
export interface FormState {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;
  currentStep?: number;
  totalSteps?: number;
}

// Form Context
export interface FormContextType {
  schema: FormSchema;
  state: FormState;
  updateField: (name: string, value: any) => void;
  validateField: (name: string) => void;
  validateForm: () => boolean;
  submitForm: () => Promise<void>;
  resetForm: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setFieldVisibility: (name: string, visible: boolean) => void;
  setFieldDisabled: (name: string, disabled: boolean) => void;
}

// Form Builder Types
export interface FormBuilderState {
  schema: FormSchema;
  selectedField?: string;
  draggedField?: FieldSchema;
  previewMode: boolean;
  savedVersions: FormSchema[];
}

export interface FieldTemplate {
  type: FieldType;
  label: string;
  icon: string;
  description: string;
  defaultProps: Partial<FieldSchema>;
  category: "basic" | "advanced" | "layout" | "business";
}

// Pre-built Form Templates
export interface FormTemplate {
  id: string;
  name: string;
  description: string;
  category: "hr" | "finance" | "crm" | "project" | "general";
  schema: FormSchema;
  thumbnail?: string;
}

export const defaultFormSchema: FormSchema = {
  id: "new-form",
  title: "New Form",
  description: "Create a new dynamic form",
  version: "1.0.0",
  layout: "vertical",
  columns: 1,
  fields: [],
  settings: {
    showProgress: false,
    allowDraft: true,
    autoSave: false,
    submitText: "Submit",
    resetText: "Reset",
    cancelText: "Cancel",
    multiStep: false,
    submitOnEnter: true,
    validateOnChange: true,
  },
};
