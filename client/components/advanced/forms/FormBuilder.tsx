import React, { useState } from "react";
import {
  FormSchema,
  FieldSchema,
  FieldType,
  FieldTemplate,
  defaultFormSchema,
} from "./types";
import { DynamicForm } from "./DynamicForm";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Label } from "../../ui/label";
import { Switch } from "../../ui/switch";
import { Separator } from "../../ui/separator";
import { ScrollArea } from "../../ui/scroll-area";
import {
  Plus,
  Trash2,
  Copy,
  Eye,
  Settings,
  Save,
  Download,
  Upload,
  Type,
  Mail,
  Hash,
  MessageSquare,
  ListChecks,
  ToggleLeft,
  Calendar,
  FileUp,
  Palette,
  Star,
  MapPin,
  PenTool,
} from "lucide-react";
import { cn } from "../../../lib/utils";

const fieldTemplates: FieldTemplate[] = [
  {
    type: "text",
    label: "Text Input",
    icon: "Type",
    description: "Single line text input",
    defaultProps: { type: "text", label: "Text Field", name: "text_field" },
    category: "basic",
  },
  {
    type: "email",
    label: "Email",
    icon: "Mail",
    description: "Email address input",
    defaultProps: { type: "email", label: "Email", name: "email" },
    category: "basic",
  },
  {
    type: "number",
    label: "Number",
    icon: "Hash",
    description: "Numeric input",
    defaultProps: { type: "number", label: "Number", name: "number" },
    category: "basic",
  },
  {
    type: "textarea",
    label: "Textarea",
    icon: "MessageSquare",
    description: "Multi-line text input",
    defaultProps: {
      type: "textarea",
      label: "Description",
      name: "description",
      rows: 3,
    },
    category: "basic",
  },
  {
    type: "select",
    label: "Select",
    icon: "ListChecks",
    description: "Dropdown selection",
    defaultProps: {
      type: "select",
      label: "Select Option",
      name: "select",
      options: [
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" },
      ],
    },
    category: "basic",
  },
  {
    type: "checkbox",
    label: "Checkbox",
    icon: "ToggleLeft",
    description: "True/false checkbox",
    defaultProps: { type: "checkbox", label: "I agree", name: "agreement" },
    category: "basic",
  },
  {
    type: "date",
    label: "Date",
    icon: "Calendar",
    description: "Date picker",
    defaultProps: { type: "date", label: "Date", name: "date" },
    category: "basic",
  },
  {
    type: "file",
    label: "File Upload",
    icon: "FileUp",
    description: "File upload input",
    defaultProps: { type: "file", label: "Upload File", name: "file" },
    category: "basic",
  },
  {
    type: "currency",
    label: "Currency",
    icon: "Hash",
    description: "Indian Rupee amount",
    defaultProps: { type: "currency", label: "Amount (₹)", name: "amount" },
    category: "business",
  },
  {
    type: "phone",
    label: "Phone",
    icon: "Type",
    description: "Phone number input",
    defaultProps: { type: "phone", label: "Phone Number", name: "phone" },
    category: "business",
  },
  {
    type: "rating",
    label: "Rating",
    icon: "Star",
    description: "Star rating input",
    defaultProps: { type: "rating", label: "Rating", name: "rating", max: 5 },
    category: "advanced",
  },
  {
    type: "color",
    label: "Color",
    icon: "Palette",
    description: "Color picker",
    defaultProps: { type: "color", label: "Color", name: "color" },
    category: "advanced",
  },
  {
    type: "address",
    label: "Address",
    icon: "MapPin",
    description: "Complete address form",
    defaultProps: { type: "address", label: "Address", name: "address" },
    category: "business",
  },
  {
    type: "signature",
    label: "Signature",
    icon: "PenTool",
    description: "Digital signature",
    defaultProps: { type: "signature", label: "Signature", name: "signature" },
    category: "advanced",
  },
];

interface FormBuilderProps {
  initialSchema?: FormSchema;
  onSave: (schema: FormSchema) => void;
  onPreview?: (schema: FormSchema) => void;
}

export function FormBuilder({
  initialSchema,
  onSave,
  onPreview,
}: FormBuilderProps) {
  const [schema, setSchema] = useState<FormSchema>(
    initialSchema || defaultFormSchema,
  );
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("design");
  const [previewMode, setPreviewMode] = useState(false);

  // Add field to form
  const addField = (template: FieldTemplate) => {
    const newField: FieldSchema = {
      id: `field_${Date.now()}`,
      name: `${template.type}_${Date.now()}`,
      ...template.defaultProps,
    };

    setSchema((prev) => ({
      ...prev,
      fields: [...(prev.fields || []), newField],
    }));
    setSelectedField(newField.id);
  };

  // Update field
  const updateField = (fieldId: string, updates: Partial<FieldSchema>) => {
    setSchema((prev) => ({
      ...prev,
      fields: (prev.fields || []).map((field) =>
        field.id === fieldId ? { ...field, ...updates } : field,
      ),
    }));
  };

  // Delete field
  const deleteField = (fieldId: string) => {
    setSchema((prev) => ({
      ...prev,
      fields: (prev.fields || []).filter((field) => field.id !== fieldId),
    }));
    if (selectedField === fieldId) {
      setSelectedField(null);
    }
  };

  // Duplicate field
  const duplicateField = (fieldId: string) => {
    const field = schema.fields?.find((f) => f.id === fieldId);
    if (field) {
      const newField: FieldSchema = {
        ...field,
        id: `field_${Date.now()}`,
        name: `${field.name}_copy`,
        label: `${field.label} (Copy)`,
      };
      setSchema((prev) => ({
        ...prev,
        fields: [...(prev.fields || []), newField],
      }));
    }
  };

  // Update form settings
  const updateFormSettings = (updates: Partial<FormSchema>) => {
    setSchema((prev) => ({ ...prev, ...updates }));
  };

  const selectedFieldData = schema.fields?.find((f) => f.id === selectedField);

  const handleFormSubmit = async (values: Record<string, any>) => {
    console.log("Form submitted:", values);
  };

  return (
    <div className="h-screen flex">
      {/* Left Sidebar - Field Library */}
      <div className="w-64 border-r bg-muted/10 p-4">
        <h3 className="font-semibold mb-4">Field Library</h3>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-2">
            {["basic", "business", "advanced"].map((category) => (
              <div key={category}>
                <h4 className="text-sm font-medium text-muted-foreground mb-2 capitalize">
                  {category}
                </h4>
                {fieldTemplates
                  .filter((template) => template.category === category)
                  .map((template) => (
                    <Button
                      key={template.type}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start h-auto p-2"
                      onClick={() => addField(template)}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                          {getFieldIcon(template.icon)}
                        </div>
                        <div className="text-left">
                          <div className="text-xs font-medium">
                            {template.label}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {template.description}
                          </div>
                        </div>
                      </div>
                    </Button>
                  ))}
                <Separator className="my-3" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b p-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">{schema.title}</h2>
            <p className="text-sm text-muted-foreground">
              {schema.fields?.length || 0} fields
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPreviewMode(!previewMode)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {previewMode ? "Edit" : "Preview"}
            </Button>
            <Button size="sm" onClick={() => onSave(schema)}>
              <Save className="h-4 w-4 mr-2" />
              Save Form
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex">
          {previewMode ? (
            /* Preview Mode */
            <div className="flex-1 p-6 overflow-auto">
              <DynamicForm
                schema={schema}
                onSubmit={handleFormSubmit}
                mode="create"
              />
            </div>
          ) : (
            <>
              {/* Form Canvas */}
              <div className="flex-1 p-6 overflow-auto">
                <div className="space-y-4">
                  {/* Form Header */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{schema.title}</CardTitle>
                      {schema.description && (
                        <CardDescription>{schema.description}</CardDescription>
                      )}
                    </CardHeader>
                  </Card>

                  {/* Fields */}
                  {schema.fields?.map((field, index) => (
                    <Card
                      key={field.id}
                      className={cn(
                        "cursor-pointer transition-colors",
                        selectedField === field.id
                          ? "ring-2 ring-primary"
                          : "hover:bg-muted/50",
                      )}
                      onClick={() => setSelectedField(field.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{field.type}</Badge>
                            <span className="font-medium">{field.label}</span>
                            {field.required && (
                              <span className="text-red-500">*</span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                duplicateField(field.id);
                              }}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteField(field.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {field.description ||
                            field.placeholder ||
                            "No description"}
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Empty State */}
                  {(!schema.fields || schema.fields.length === 0) && (
                    <Card className="border-dashed">
                      <CardContent className="p-8 text-center">
                        <Plus className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">
                          Drag fields from the library to start building your
                          form
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {/* Right Sidebar - Properties */}
              <div className="w-80 border-l p-4">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="design">Design</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>

                  <TabsContent value="design" className="space-y-4">
                    {selectedFieldData ? (
                      <ScrollArea className="h-[calc(100vh-12rem)]">
                        <div className="space-y-4">
                          <h3 className="font-semibold">Field Properties</h3>

                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="field-label">Label</Label>
                              <Input
                                id="field-label"
                                value={selectedFieldData.label}
                                onChange={(e) =>
                                  updateField(selectedFieldData.id, {
                                    label: e.target.value,
                                  })
                                }
                              />
                            </div>

                            <div>
                              <Label htmlFor="field-name">Name</Label>
                              <Input
                                id="field-name"
                                value={selectedFieldData.name}
                                onChange={(e) =>
                                  updateField(selectedFieldData.id, {
                                    name: e.target.value,
                                  })
                                }
                              />
                            </div>

                            <div>
                              <Label htmlFor="field-placeholder">
                                Placeholder
                              </Label>
                              <Input
                                id="field-placeholder"
                                value={selectedFieldData.placeholder || ""}
                                onChange={(e) =>
                                  updateField(selectedFieldData.id, {
                                    placeholder: e.target.value,
                                  })
                                }
                              />
                            </div>

                            <div>
                              <Label htmlFor="field-description">
                                Description
                              </Label>
                              <Textarea
                                id="field-description"
                                value={selectedFieldData.description || ""}
                                onChange={(e) =>
                                  updateField(selectedFieldData.id, {
                                    description: e.target.value,
                                  })
                                }
                                rows={2}
                              />
                            </div>

                            <div className="flex items-center space-x-2">
                              <Switch
                                id="field-required"
                                checked={selectedFieldData.required || false}
                                onCheckedChange={(checked) =>
                                  updateField(selectedFieldData.id, {
                                    required: checked,
                                  })
                                }
                              />
                              <Label htmlFor="field-required">Required</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Switch
                                id="field-disabled"
                                checked={selectedFieldData.disabled || false}
                                onCheckedChange={(checked) =>
                                  updateField(selectedFieldData.id, {
                                    disabled: checked,
                                  })
                                }
                              />
                              <Label htmlFor="field-disabled">Disabled</Label>
                            </div>

                            {/* Field-specific properties */}
                            {(selectedFieldData.type === "select" ||
                              selectedFieldData.type === "radio" ||
                              selectedFieldData.type === "multiselect") && (
                              <div>
                                <Label>Options</Label>
                                <div className="space-y-2">
                                  {selectedFieldData.options?.map(
                                    (option, index) => (
                                      <div
                                        key={index}
                                        className="flex space-x-2"
                                      >
                                        <Input
                                          placeholder="Label"
                                          value={option.label}
                                          onChange={(e) => {
                                            const newOptions = [
                                              ...(selectedFieldData.options ||
                                                []),
                                            ];
                                            newOptions[index] = {
                                              ...option,
                                              label: e.target.value,
                                            };
                                            updateField(selectedFieldData.id, {
                                              options: newOptions,
                                            });
                                          }}
                                        />
                                        <Input
                                          placeholder="Value"
                                          value={option.value}
                                          onChange={(e) => {
                                            const newOptions = [
                                              ...(selectedFieldData.options ||
                                                []),
                                            ];
                                            newOptions[index] = {
                                              ...option,
                                              value: e.target.value,
                                            };
                                            updateField(selectedFieldData.id, {
                                              options: newOptions,
                                            });
                                          }}
                                        />
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          onClick={() => {
                                            const newOptions = (
                                              selectedFieldData.options || []
                                            ).filter((_, i) => i !== index);
                                            updateField(selectedFieldData.id, {
                                              options: newOptions,
                                            });
                                          }}
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    ),
                                  )}
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      const newOptions = [
                                        ...(selectedFieldData.options || []),
                                        {
                                          label: "New Option",
                                          value: `option_${Date.now()}`,
                                        },
                                      ];
                                      updateField(selectedFieldData.id, {
                                        options: newOptions,
                                      });
                                    }}
                                  >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Option
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </ScrollArea>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        Select a field to edit its properties
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="settings" className="space-y-4">
                    <ScrollArea className="h-[calc(100vh-12rem)]">
                      <div className="space-y-4">
                        <h3 className="font-semibold">Form Settings</h3>

                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="form-title">Form Title</Label>
                            <Input
                              id="form-title"
                              value={schema.title}
                              onChange={(e) =>
                                updateFormSettings({ title: e.target.value })
                              }
                            />
                          </div>

                          <div>
                            <Label htmlFor="form-description">
                              Description
                            </Label>
                            <Textarea
                              id="form-description"
                              value={schema.description || ""}
                              onChange={(e) =>
                                updateFormSettings({
                                  description: e.target.value,
                                })
                              }
                              rows={3}
                            />
                          </div>

                          <div>
                            <Label htmlFor="form-layout">Layout</Label>
                            <Select
                              value={schema.layout}
                              onValueChange={(value) =>
                                updateFormSettings({ layout: value as any })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="vertical">
                                  Vertical
                                </SelectItem>
                                <SelectItem value="horizontal">
                                  Horizontal
                                </SelectItem>
                                <SelectItem value="grid">Grid</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {schema.layout === "grid" && (
                            <div>
                              <Label htmlFor="form-columns">Columns</Label>
                              <Input
                                id="form-columns"
                                type="number"
                                min="1"
                                max="4"
                                value={schema.columns || 2}
                                onChange={(e) =>
                                  updateFormSettings({
                                    columns: Number(e.target.value),
                                  })
                                }
                              />
                            </div>
                          )}

                          <Separator />

                          <div className="space-y-3">
                            <h4 className="font-medium">Form Options</h4>

                            <div className="flex items-center space-x-2">
                              <Switch
                                id="show-progress"
                                checked={schema.settings.showProgress || false}
                                onCheckedChange={(checked) =>
                                  updateFormSettings({
                                    settings: {
                                      ...schema.settings,
                                      showProgress: checked,
                                    },
                                  })
                                }
                              />
                              <Label htmlFor="show-progress">
                                Show Progress
                              </Label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Switch
                                id="allow-draft"
                                checked={schema.settings.allowDraft || false}
                                onCheckedChange={(checked) =>
                                  updateFormSettings({
                                    settings: {
                                      ...schema.settings,
                                      allowDraft: checked,
                                    },
                                  })
                                }
                              />
                              <Label htmlFor="allow-draft">
                                Allow Draft Save
                              </Label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Switch
                                id="auto-save"
                                checked={schema.settings.autoSave || false}
                                onCheckedChange={(checked) =>
                                  updateFormSettings({
                                    settings: {
                                      ...schema.settings,
                                      autoSave: checked,
                                    },
                                  })
                                }
                              />
                              <Label htmlFor="auto-save">Auto Save</Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function getFieldIcon(iconName: string) {
  const icons: Record<string, React.ReactNode> = {
    Type: <Type className="h-4 w-4" />,
    Mail: <Mail className="h-4 w-4" />,
    Hash: <Hash className="h-4 w-4" />,
    MessageSquare: <MessageSquare className="h-4 w-4" />,
    ListChecks: <ListChecks className="h-4 w-4" />,
    ToggleLeft: <ToggleLeft className="h-4 w-4" />,
    Calendar: <Calendar className="h-4 w-4" />,
    FileUp: <FileUp className="h-4 w-4" />,
    Star: <Star className="h-4 w-4" />,
    Palette: <Palette className="h-4 w-4" />,
    MapPin: <MapPin className="h-4 w-4" />,
    PenTool: <PenTool className="h-4 w-4" />,
  };
  return icons[iconName] || <Type className="h-4 w-4" />;
}
