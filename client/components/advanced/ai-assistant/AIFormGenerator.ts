import {
  FormSchema,
  FieldSchema,
  FormSection,
  defaultFormSchema,
} from "../forms/types";
import {
  RecognizedIntent,
  FormGenerationContext,
  FieldSuggestion,
  ValidationSuggestion,
  FormAnalysisResult,
  AISuggestion,
} from "./types";

export class AIFormGenerator {
  // Intent Recognition Engine
  static recognizeIntent(userInput: string): RecognizedIntent {
    const input = userInput.toLowerCase();

    // Intent patterns
    const intentPatterns = {
      create_form: [
        /create.*form/,
        /build.*form/,
        /generate.*form/,
        /new.*form/,
        /make.*form/,
      ],
      analyze_form: [
        /analyze.*form/,
        /check.*form/,
        /review.*form/,
        /evaluate.*form/,
      ],
      suggest_improvements: [
        /improve.*form/,
        /optimize.*form/,
        /enhance.*form/,
        /better.*form/,
      ],
      add_field: [/add.*field/, /new.*field/, /include.*field/],
      modify_field: [/change.*field/, /modify.*field/, /update.*field/],
    };

    // Entity extraction
    const entities: any = {};

    // Extract form types
    const formTypes = [
      "employee onboarding",
      "project request",
      "expense claim",
      "leave application",
      "customer feedback",
      "safety inspection",
      "supplier registration",
      "performance review",
    ];

    for (const formType of formTypes) {
      if (input.includes(formType)) {
        entities.formType = formType;
        break;
      }
    }

    // Extract field types
    const fieldTypes = [
      "text",
      "email",
      "phone",
      "date",
      "currency",
      "file",
      "rating",
      "address",
      "dropdown",
      "checkbox",
      "signature",
    ];
    entities.fieldTypes = fieldTypes.filter((type) => input.includes(type));

    // Extract industry
    const industries = ["construction", "finance", "hr", "sales"];
    for (const industry of industries) {
      if (input.includes(industry)) {
        entities.industry = industry;
        break;
      }
    }

    // Determine intent
    let intent = "create_form";
    let confidence = 0.5;

    for (const [intentType, patterns] of Object.entries(intentPatterns)) {
      for (const pattern of patterns) {
        if (pattern.test(input)) {
          intent = intentType;
          confidence = 0.8;
          break;
        }
      }
      if (confidence > 0.7) break;
    }

    return {
      intent: intent as any,
      confidence,
      entities,
      context: {
        industry: entities.industry || "general",
        purpose: entities.formType || "custom form",
        locale: "en-IN",
        preferredLayout: "vertical",
      },
    };
  }

  // Form Generation from Natural Language
  static generateFormFromDescription(
    description: string,
    context: FormGenerationContext,
  ): FormSchema {
    const intent = this.recognizeIntent(description);

    // Base form structure
    const form: FormSchema = {
      ...defaultFormSchema,
      id: `ai_generated_${Date.now()}`,
      title: this.generateFormTitle(
        intent.entities.formType || context.purpose,
      ),
      description: `AI-generated form based on: ${description}`,
      layout: context.preferredLayout || "vertical",
    };

    // Generate fields based on form type
    if (intent.entities.formType) {
      form.fields = this.generateFieldsForFormType(intent.entities.formType);
      form.sections = this.generateSectionsForFormType(
        intent.entities.formType,
      );
    } else {
      // Generate fields based on requirements
      form.fields = this.generateFieldsFromRequirements(description, context);
    }

    // Apply industry-specific optimizations
    if (context.industry) {
      this.applyIndustryOptimizations(form, context.industry);
    }

    // Add compliance fields for India
    this.addIndianComplianceFields(form, context);

    return form;
  }

  // Generate form title
  private static generateFormTitle(purpose: string): string {
    const titleMap: Record<string, string> = {
      "employee onboarding": "Employee Onboarding Form",
      "project request": "New Project Request",
      "expense claim": "Expense Reimbursement Claim",
      "leave application": "Leave Application Form",
      "customer feedback": "Customer Feedback Survey",
      "safety inspection": "Safety Inspection Checklist",
      "supplier registration": "Supplier Registration Form",
      "performance review": "Employee Performance Review",
    };

    return (
      titleMap[purpose] ||
      `${purpose.charAt(0).toUpperCase() + purpose.slice(1)} Form`
    );
  }

  // Generate fields for specific form types
  private static generateFieldsForFormType(formType: string): FieldSchema[] {
    const fieldTemplates: Record<string, FieldSchema[]> = {
      "employee onboarding": [
        {
          id: "emp_first_name",
          type: "text",
          name: "firstName",
          label: "First Name",
          required: true,
          validation: [{ type: "required", message: "First name is required" }],
        },
        {
          id: "emp_last_name",
          type: "text",
          name: "lastName",
          label: "Last Name",
          required: true,
          validation: [{ type: "required", message: "Last name is required" }],
        },
        {
          id: "emp_email",
          type: "email",
          name: "email",
          label: "Email Address",
          required: true,
          validation: [
            { type: "required", message: "Email is required" },
            { type: "email", message: "Valid email required" },
          ],
        },
        {
          id: "emp_phone",
          type: "phone",
          name: "phone",
          label: "Phone Number",
          placeholder: "+91 98765 43210",
          required: true,
        },
        {
          id: "emp_address",
          type: "address",
          name: "address",
          label: "Residential Address",
          required: true,
        },
        {
          id: "emp_start_date",
          type: "date",
          name: "startDate",
          label: "Joining Date",
          required: true,
        },
        {
          id: "emp_department",
          type: "select",
          name: "department",
          label: "Department",
          required: true,
          options: [
            { label: "Engineering", value: "engineering" },
            { label: "Construction", value: "construction" },
            { label: "Finance", value: "finance" },
            { label: "HR", value: "hr" },
            { label: "Sales", value: "sales" },
          ],
        },
        {
          id: "emp_salary",
          type: "currency",
          name: "salary",
          label: "Annual Salary (₹)",
          required: true,
        },
      ],

      "project request": [
        {
          id: "proj_name",
          type: "text",
          name: "projectName",
          label: "Project Name",
          required: true,
          validation: [
            { type: "required", message: "Project name is required" },
          ],
        },
        {
          id: "proj_description",
          type: "textarea",
          name: "description",
          label: "Project Description",
          required: true,
          rows: 4,
        },
        {
          id: "proj_budget",
          type: "currency",
          name: "budget",
          label: "Estimated Budget (₹)",
          required: true,
        },
        {
          id: "proj_deadline",
          type: "date",
          name: "deadline",
          label: "Target Completion Date",
          required: true,
        },
        {
          id: "proj_priority",
          type: "select",
          name: "priority",
          label: "Priority Level",
          required: true,
          options: [
            { label: "Low", value: "low" },
            { label: "Medium", value: "medium" },
            { label: "High", value: "high" },
            { label: "Critical", value: "critical" },
          ],
        },
        {
          id: "proj_manager",
          type: "text",
          name: "projectManager",
          label: "Proposed Project Manager",
          required: true,
        },
        {
          id: "proj_resources",
          type: "multiselect",
          name: "requiredResources",
          label: "Required Resources",
          options: [
            { label: "Development Team", value: "development" },
            { label: "Construction Crew", value: "construction" },
            { label: "Equipment", value: "equipment" },
            { label: "Materials", value: "materials" },
            { label: "Consultants", value: "consultants" },
          ],
        },
      ],

      "customer feedback": [
        {
          id: "cust_name",
          type: "text",
          name: "customerName",
          label: "Your Name",
          required: true,
        },
        {
          id: "cust_email",
          type: "email",
          name: "email",
          label: "Email Address",
          required: true,
        },
        {
          id: "cust_product",
          type: "select",
          name: "product",
          label: "Product/Service",
          required: true,
          options: [
            { label: "Residential Project", value: "residential" },
            { label: "Commercial Project", value: "commercial" },
            { label: "Infrastructure", value: "infrastructure" },
            { label: "Consulting", value: "consulting" },
          ],
        },
        {
          id: "cust_rating",
          type: "rating",
          name: "overallRating",
          label: "Overall Satisfaction",
          required: true,
          max: 5,
        },
        {
          id: "cust_feedback",
          type: "textarea",
          name: "feedback",
          label: "Your Feedback",
          required: true,
          rows: 4,
        },
        {
          id: "cust_recommend",
          type: "radio",
          name: "recommend",
          label: "Would you recommend us?",
          required: true,
          options: [
            { label: "Definitely", value: "definitely" },
            { label: "Probably", value: "probably" },
            { label: "Not Sure", value: "not_sure" },
            { label: "Probably Not", value: "probably_not" },
            { label: "Definitely Not", value: "definitely_not" },
          ],
        },
      ],
    };

    return fieldTemplates[formType] || [];
  }

  // Generate sections for form types
  private static generateSectionsForFormType(
    formType: string,
  ): FormSection[] | undefined {
    if (formType === "employee onboarding") {
      return [
        {
          id: "personal_info",
          title: "Personal Information",
          description: "Basic personal details",
          collapsible: false,
          collapsed: false,
          fields: this.generateFieldsForFormType(formType).slice(0, 5),
        },
        {
          id: "employment_details",
          title: "Employment Details",
          description: "Job-related information",
          collapsible: false,
          collapsed: false,
          fields: this.generateFieldsForFormType(formType).slice(5),
        },
      ];
    }
    return undefined;
  }

  // Generate fields from requirements
  private static generateFieldsFromRequirements(
    description: string,
    context: FormGenerationContext,
  ): FieldSchema[] {
    const fields: FieldSchema[] = [];
    const desc = description.toLowerCase();

    // Basic contact fields
    if (desc.includes("name") || desc.includes("contact")) {
      fields.push({
        id: "name",
        type: "text",
        name: "name",
        label: "Full Name",
        required: true,
        validation: [{ type: "required", message: "Name is required" }],
      });
    }

    if (desc.includes("email")) {
      fields.push({
        id: "email",
        type: "email",
        name: "email",
        label: "Email Address",
        required: true,
        validation: [
          { type: "required", message: "Email is required" },
          { type: "email", message: "Valid email required" },
        ],
      });
    }

    if (desc.includes("phone")) {
      fields.push({
        id: "phone",
        type: "phone",
        name: "phone",
        label: "Phone Number",
        placeholder: "+91 98765 43210",
        required: true,
      });
    }

    // Business-specific fields
    if (
      desc.includes("budget") ||
      desc.includes("amount") ||
      desc.includes("cost")
    ) {
      fields.push({
        id: "amount",
        type: "currency",
        name: "amount",
        label: "Amount (₹)",
        required: true,
      });
    }

    if (
      desc.includes("date") ||
      desc.includes("deadline") ||
      desc.includes("schedule")
    ) {
      fields.push({
        id: "date",
        type: "date",
        name: "date",
        label: "Date",
        required: true,
      });
    }

    if (
      desc.includes("rating") ||
      desc.includes("satisfaction") ||
      desc.includes("score")
    ) {
      fields.push({
        id: "rating",
        type: "rating",
        name: "rating",
        label: "Rating",
        max: 5,
        required: true,
      });
    }

    if (
      desc.includes("file") ||
      desc.includes("upload") ||
      desc.includes("document")
    ) {
      fields.push({
        id: "file",
        type: "file",
        name: "file",
        label: "Upload File",
        accept: ".pdf,.doc,.docx,.jpg,.png",
      });
    }

    if (desc.includes("address") || desc.includes("location")) {
      fields.push({
        id: "address",
        type: "address",
        name: "address",
        label: "Address",
        required: true,
      });
    }

    return fields;
  }

  // Apply industry-specific optimizations
  private static applyIndustryOptimizations(
    form: FormSchema,
    industry: string,
  ): void {
    switch (industry) {
      case "construction":
        // Add safety and compliance fields
        if (form.fields) {
          form.fields.push({
            id: "safety_training",
            type: "checkbox",
            name: "safetyTraining",
            label: "Safety training completed",
            required: true,
          });
        }
        break;

      case "finance":
        // Add financial compliance fields
        if (form.fields) {
          form.fields.push({
            id: "financial_year",
            type: "select",
            name: "financialYear",
            label: "Financial Year",
            options: [
              { label: "2023-24", value: "2023-24" },
              { label: "2024-25", value: "2024-25" },
            ],
          });
        }
        break;
    }
  }

  // Add Indian compliance fields
  private static addIndianComplianceFields(
    form: FormSchema,
    context: FormGenerationContext,
  ): void {
    if (!form.fields) return;

    // Add GST field for business forms
    if (
      context.purpose.includes("supplier") ||
      context.purpose.includes("vendor")
    ) {
      form.fields.push({
        id: "gst_number",
        type: "text",
        name: "gstNumber",
        label: "GST Number",
        pattern: "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$",
        validation: [
          {
            type: "pattern",
            value: "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$",
            message: "Please enter a valid GST number",
          },
        ],
      });
    }

    // Add PAN field for employee forms
    if (
      context.purpose.includes("employee") ||
      context.purpose.includes("onboarding")
    ) {
      form.fields.push({
        id: "pan_number",
        type: "text",
        name: "panNumber",
        label: "PAN Number",
        pattern: "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
        validation: [
          {
            type: "pattern",
            value: "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
            message: "Please enter a valid PAN number",
          },
        ],
      });
    }
  }

  // Analyze form and provide suggestions
  static analyzeForm(form: FormSchema): FormAnalysisResult {
    const fieldCount = form.fields?.length || 0;
    const hasRequiredFields = form.fields?.some((f) => f.required) || false;
    const hasValidation =
      form.fields?.some((f) => f.validation?.length) || false;

    // Calculate scores
    const usabilityScore = this.calculateUsabilityScore(form);
    const performanceScore = this.calculatePerformanceScore(form);
    const complianceScore = this.calculateComplianceScore(form);
    const overallScore =
      (usabilityScore + performanceScore + complianceScore) / 3;

    // Generate suggestions
    const suggestions = this.generateFormSuggestions(form);

    return {
      score: Math.round(overallScore),
      completionRate: Math.max(60, 100 - fieldCount * 2), // Simplified calculation
      usabilityScore: Math.round(usabilityScore),
      performanceScore: Math.round(performanceScore),
      complianceScore: Math.round(complianceScore),
      suggestions,
      insights: {
        fieldCount,
        estimatedCompletionTime: Math.max(2, fieldCount * 0.5),
        complexityLevel:
          fieldCount < 5 ? "simple" : fieldCount < 10 ? "moderate" : "complex",
        recommendedImprovements: [
          fieldCount > 10 ? "Consider breaking into multiple steps" : null,
          !hasRequiredFields ? "Add required field indicators" : null,
          !hasValidation ? "Add validation rules for data quality" : null,
        ].filter(Boolean) as string[],
      },
    };
  }

  // Calculate usability score
  private static calculateUsabilityScore(form: FormSchema): number {
    let score = 100;
    const fieldCount = form.fields?.length || 0;

    // Penalize for too many fields
    if (fieldCount > 10) score -= (fieldCount - 10) * 5;
    if (fieldCount > 20) score -= (fieldCount - 20) * 10;

    // Reward for good practices
    if (form.description) score += 5;
    if (form.settings.showProgress) score += 10;
    if (form.settings.allowDraft) score += 10;

    return Math.max(0, Math.min(100, score));
  }

  // Calculate performance score
  private static calculatePerformanceScore(form: FormSchema): number {
    let score = 100;
    const fieldCount = form.fields?.length || 0;

    // Simple performance calculation based on field count and types
    score -= fieldCount * 2;

    // Penalize for heavy field types
    const heavyFields =
      form.fields?.filter(
        (f) =>
          f.type === "file" || f.type === "richtext" || f.type === "signature",
      ).length || 0;
    score -= heavyFields * 10;

    return Math.max(0, Math.min(100, score));
  }

  // Calculate compliance score
  private static calculateComplianceScore(form: FormSchema): number {
    let score = 70; // Base score

    // Check for Indian compliance fields
    const hasGST = form.fields?.some((f) => f.name.includes("gst")) || false;
    const hasPAN = form.fields?.some((f) => f.name.includes("pan")) || false;
    const hasValidation =
      form.fields?.some((f) => f.validation?.length) || false;

    if (hasGST) score += 10;
    if (hasPAN) score += 10;
    if (hasValidation) score += 10;

    return Math.max(0, Math.min(100, score));
  }

  // Generate form improvement suggestions
  private static generateFormSuggestions(form: FormSchema): AISuggestion[] {
    const suggestions: AISuggestion[] = [];
    const fieldCount = form.fields?.length || 0;

    // Too many fields suggestion
    if (fieldCount > 10) {
      suggestions.push({
        id: "reduce_fields",
        type: "form_optimization",
        title: "Reduce Form Length",
        description: `Your form has ${fieldCount} fields. Consider breaking it into sections or removing non-essential fields.`,
        confidence: 0.9,
        impact: "high",
        category: "usability",
        action: {
          type: "optimize",
          payload: { suggestion: "split_sections" },
        },
        reasoning:
          "Forms with more than 10 fields have significantly lower completion rates.",
      });
    }

    // Missing progress indicator
    if (!form.settings.showProgress && fieldCount > 5) {
      suggestions.push({
        id: "add_progress",
        type: "form_optimization",
        title: "Add Progress Indicator",
        description:
          "Show users their progress through the form to improve completion rates.",
        confidence: 0.8,
        impact: "medium",
        category: "usability",
        action: {
          type: "optimize",
          payload: { setting: "showProgress", value: true },
        },
        reasoning: "Progress indicators reduce abandonment rates by 15-20%.",
      });
    }

    // Missing validation
    const fieldsWithoutValidation =
      form.fields?.filter((f) => !f.validation?.length) || [];
    if (fieldsWithoutValidation.length > 0) {
      suggestions.push({
        id: "add_validation",
        type: "validation_rule",
        title: "Add Validation Rules",
        description: `${fieldsWithoutValidation.length} fields lack validation rules. This can lead to poor data quality.`,
        confidence: 0.85,
        impact: "high",
        category: "validation",
        action: {
          type: "add_validation",
          payload: { fields: fieldsWithoutValidation.map((f) => f.name) },
        },
        reasoning:
          "Proper validation improves data quality and user experience.",
      });
    }

    return suggestions;
  }

  // Generate field suggestions
  static suggestFields(
    context: string,
    existingFields: FieldSchema[],
  ): FieldSuggestion[] {
    const suggestions: FieldSuggestion[] = [];
    const contextLower = context.toLowerCase();

    // Suggest missing common fields
    const existingFieldNames = existingFields.map((f) => f.name.toLowerCase());

    if (
      contextLower.includes("contact") &&
      !existingFieldNames.includes("phone")
    ) {
      suggestions.push({
        fieldSchema: {
          id: "suggested_phone",
          type: "phone",
          name: "phone",
          label: "Phone Number",
          placeholder: "+91 98765 43210",
          required: true,
        },
        reasoning:
          "Phone number is essential for contact forms and customer communication.",
        confidence: 0.9,
        alternatives: [],
        bestPractices: [
          "Use Indian phone number format (+91)",
          "Make it required for contact forms",
          "Add validation for 10-digit numbers",
        ],
      });
    }

    return suggestions;
  }
}
