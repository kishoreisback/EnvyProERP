import React, { useState, useEffect, useCallback } from "react";
import { FormSchema, FormState, FieldSchema, ConditionalLogic } from "./types";
import { DynamicField } from "./DynamicField";
import { Button } from "../../ui/button";
import { Progress } from "../../ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../ui/collapsible";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";
import { ChevronDown, ChevronUp, Save, RotateCcw, Send } from "lucide-react";
import { cn } from "../../../lib/utils";
import { useToast } from "../../ui/use-toast";

interface DynamicFormProps {
  schema: FormSchema;
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => Promise<void>;
  onDraftSave?: (values: Record<string, any>) => void;
  className?: string;
  mode?: "create" | "edit" | "view";
}

export function DynamicForm({
  schema,
  initialValues = {},
  onSubmit,
  onDraftSave,
  className,
  mode = "create",
}: DynamicFormProps) {
  const { toast } = useToast();
  const [formState, setFormState] = useState<FormState>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isDirty: false,
    isValid: false,
    currentStep: 0,
    totalSteps: schema.sections?.length || 1,
  });

  const [collapsedSections, setCollapsedSections] = useState<
    Record<string, boolean>
  >({});
  const [hiddenFields, setHiddenFields] = useState<Set<string>>(new Set());
  const [disabledFields, setDisabledFields] = useState<Set<string>>(new Set());

  const isReadonly = mode === "view";

  // Get all fields (from sections or direct fields)
  const getAllFields = useCallback((): FieldSchema[] => {
    if (schema.sections) {
      return schema.sections.flatMap((section) => section.fields);
    }
    return schema.fields || [];
  }, [schema]);

  // Evaluate conditional logic
  const evaluateCondition = useCallback(
    (logic: ConditionalLogic, values: Record<string, any>): boolean => {
      const fieldValue = values[logic.field];

      switch (logic.operator) {
        case "equals":
          return fieldValue === logic.value;
        case "not_equals":
          return fieldValue !== logic.value;
        case "greater_than":
          return Number(fieldValue) > Number(logic.value);
        case "less_than":
          return Number(fieldValue) < Number(logic.value);
        case "contains":
          return String(fieldValue).includes(String(logic.value));
        case "is_empty":
          return (
            !fieldValue ||
            fieldValue === "" ||
            (Array.isArray(fieldValue) && fieldValue.length === 0)
          );
        case "is_not_empty":
          return (
            Boolean(fieldValue) &&
            fieldValue !== "" &&
            (!Array.isArray(fieldValue) || fieldValue.length > 0)
          );
        default:
          return false;
      }
    },
    [],
  );

  // Apply conditional logic
  useEffect(() => {
    const newHiddenFields = new Set<string>();
    const newDisabledFields = new Set<string>();
    const allFields = getAllFields();

    allFields.forEach((field) => {
      if (field.conditionalLogic) {
        field.conditionalLogic.forEach((logic) => {
          const conditionMet = evaluateCondition(logic, formState.values);

          if (conditionMet) {
            switch (logic.action) {
              case "hide":
                newHiddenFields.add(field.name);
                break;
              case "show":
                newHiddenFields.delete(field.name);
                break;
              case "disable":
                newDisabledFields.add(field.name);
                break;
              case "enable":
                newDisabledFields.delete(field.name);
                break;
              case "require":
                // Handle in validation
                break;
            }
          }
        });
      }
    });

    setHiddenFields(newHiddenFields);
    setDisabledFields(newDisabledFields);
  }, [formState.values, getAllFields, evaluateCondition]);

  // Validate field
  const validateField = useCallback(
    (field: FieldSchema, value: any): string | undefined => {
      if (!field.validation) return undefined;

      for (const rule of field.validation) {
        switch (rule.type) {
          case "required":
            if (
              !value ||
              value === "" ||
              (Array.isArray(value) && value.length === 0)
            ) {
              return rule.message;
            }
            break;
          case "min":
            if (typeof value === "string" && value.length < rule.value) {
              return rule.message;
            }
            if (typeof value === "number" && value < rule.value) {
              return rule.message;
            }
            break;
          case "max":
            if (typeof value === "string" && value.length > rule.value) {
              return rule.message;
            }
            if (typeof value === "number" && value > rule.value) {
              return rule.message;
            }
            break;
          case "email":
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
              return rule.message;
            }
            break;
          case "pattern":
            if (value && !new RegExp(rule.value).test(value)) {
              return rule.message;
            }
            break;
        }
      }

      return undefined;
    },
    [],
  );

  // Update field value
  const updateField = useCallback((name: string, value: any) => {
    setFormState((prev) => ({
      ...prev,
      values: { ...prev.values, [name]: value },
      isDirty: true,
      errors: { ...prev.errors, [name]: "" },
    }));
  }, []);

  // Handle field blur
  const handleFieldBlur = useCallback(
    (name: string) => {
      const field = getAllFields().find((f) => f.name === name);
      if (!field) return;

      const error = validateField(field, formState.values[name]);

      setFormState((prev) => ({
        ...prev,
        touched: { ...prev.touched, [name]: true },
        errors: { ...prev.errors, [name]: error || "" },
      }));
    },
    [getAllFields, validateField, formState.values],
  );

  // Validate entire form
  const validateForm = useCallback((): boolean => {
    const errors: Record<string, string> = {};
    const allFields = getAllFields();

    allFields.forEach((field) => {
      if (hiddenFields.has(field.name)) return;

      const error = validateField(field, formState.values[field.name]);
      if (error) {
        errors[field.name] = error;
      }
    });

    setFormState((prev) => ({
      ...prev,
      errors,
      isValid: Object.keys(errors).length === 0,
    }));

    return Object.keys(errors).length === 0;
  }, [getAllFields, validateField, formState.values, hiddenFields]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before submitting.",
        variant: "destructive",
      });
      return;
    }

    setFormState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      await onSubmit(formState.values);
      toast({
        title: "Success",
        description:
          schema.onSubmit?.successMessage || "Form submitted successfully!",
      });

      if (!schema.settings.allowDraft) {
        resetForm();
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          schema.onSubmit?.errorMessage ||
          "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setFormState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  // Handle draft save
  const handleDraftSave = () => {
    if (onDraftSave) {
      onDraftSave(formState.values);
      toast({
        title: "Draft Saved",
        description: "Your progress has been saved.",
      });
    }
  };

  // Reset form
  const resetForm = () => {
    setFormState({
      values: initialValues,
      errors: {},
      touched: {},
      isSubmitting: false,
      isDirty: false,
      isValid: false,
      currentStep: 0,
      totalSteps: schema.sections?.length || 1,
    });
  };

  // Toggle section collapse
  const toggleSection = (sectionId: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Calculate form progress
  const calculateProgress = (): number => {
    const allFields = getAllFields().filter((f) => !hiddenFields.has(f.name));
    const filledFields = allFields.filter((f) => {
      const value = formState.values[f.name];
      return value !== undefined && value !== "" && value !== null;
    });
    return allFields.length > 0
      ? (filledFields.length / allFields.length) * 100
      : 0;
  };

  const progress = calculateProgress();

  return (
    <Card className={cn("w-full max-w-4xl mx-auto", className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {schema.title}
          {schema.settings.showProgress && (
            <Badge variant="outline">{Math.round(progress)}% Complete</Badge>
          )}
        </CardTitle>
        {schema.description && (
          <CardDescription>{schema.description}</CardDescription>
        )}
        {schema.settings.showProgress && (
          <Progress value={progress} className="h-2" />
        )}
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {schema.sections ? (
            // Render sections
            <div className="space-y-6">
              {schema.sections.map((section) => (
                <div key={section.id} className="space-y-4">
                  {section.collapsible ? (
                    <Collapsible
                      open={!collapsedSections[section.id]}
                      onOpenChange={() => toggleSection(section.id)}
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-between p-0 h-auto"
                        >
                          <div className="text-left">
                            <h3 className="text-lg font-semibold">
                              {section.title}
                            </h3>
                            {section.description && (
                              <p className="text-sm text-muted-foreground">
                                {section.description}
                              </p>
                            )}
                          </div>
                          {collapsedSections[section.id] ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronUp className="h-4 w-4" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-4 pt-4">
                        <div
                          className={cn(
                            "grid gap-4",
                            schema.layout === "grid"
                              ? `grid-cols-${schema.columns || 2}`
                              : "grid-cols-1",
                          )}
                        >
                          {section.fields
                            .filter((field) => !hiddenFields.has(field.name))
                            .map((field) => (
                              <DynamicField
                                key={field.id}
                                field={field}
                                value={formState.values[field.name]}
                                error={formState.errors[field.name]}
                                touched={formState.touched[field.name]}
                                onChange={(value) =>
                                  updateField(field.name, value)
                                }
                                onBlur={() => handleFieldBlur(field.name)}
                                disabled={disabledFields.has(field.name)}
                                readonly={isReadonly}
                              />
                            ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {section.title}
                        </h3>
                        {section.description && (
                          <p className="text-sm text-muted-foreground">
                            {section.description}
                          </p>
                        )}
                      </div>
                      <div
                        className={cn(
                          "grid gap-4",
                          schema.layout === "grid"
                            ? `grid-cols-${schema.columns || 2}`
                            : "grid-cols-1",
                        )}
                      >
                        {section.fields
                          .filter((field) => !hiddenFields.has(field.name))
                          .map((field) => (
                            <DynamicField
                              key={field.id}
                              field={field}
                              value={formState.values[field.name]}
                              error={formState.errors[field.name]}
                              touched={formState.touched[field.name]}
                              onChange={(value) =>
                                updateField(field.name, value)
                              }
                              onBlur={() => handleFieldBlur(field.name)}
                              disabled={disabledFields.has(field.name)}
                              readonly={isReadonly}
                            />
                          ))}
                      </div>
                    </div>
                  )}
                  {section !== schema.sections[schema.sections.length - 1] && (
                    <Separator />
                  )}
                </div>
              ))}
            </div>
          ) : (
            // Render flat fields
            <div
              className={cn(
                "grid gap-4",
                schema.layout === "grid"
                  ? `grid-cols-${schema.columns || 2}`
                  : "grid-cols-1",
              )}
            >
              {(schema.fields || [])
                .filter((field) => !hiddenFields.has(field.name))
                .map((field) => (
                  <DynamicField
                    key={field.id}
                    field={field}
                    value={formState.values[field.name]}
                    error={formState.errors[field.name]}
                    touched={formState.touched[field.name]}
                    onChange={(value) => updateField(field.name, value)}
                    onBlur={() => handleFieldBlur(field.name)}
                    disabled={disabledFields.has(field.name)}
                    readonly={isReadonly}
                  />
                ))}
            </div>
          )}

          {!isReadonly && (
            <div className="flex justify-between items-center pt-6 border-t">
              <div className="flex space-x-2">
                {schema.settings.allowDraft && onDraftSave && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleDraftSave}
                    disabled={!formState.isDirty}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {schema.settings.resetText || "Save Draft"}
                  </Button>
                )}
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  disabled={!formState.isDirty}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  {schema.settings.resetText || "Reset"}
                </Button>
              </div>

              <Button
                type="submit"
                disabled={formState.isSubmitting || !formState.isDirty}
                className="min-w-24"
              >
                {formState.isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    {schema.settings.submitText || "Submit"}
                  </>
                )}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
