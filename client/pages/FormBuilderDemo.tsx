import React, { useState } from "react";
import { MainLayout } from "../components/layout/MainLayout";
import { FormBuilder, FormSchema } from "../components/advanced/forms";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { ArrowLeft, Download, Save } from "lucide-react";
import { useToast } from "../components/ui/use-toast";
import { useNavigate } from "react-router-dom";

// Sample form templates
const formTemplates: FormSchema[] = [
  {
    id: "contact-form",
    title: "Contact Us Form",
    description: "Simple contact form for website",
    version: "1.0.0",
    layout: "vertical",
    columns: 1,
    fields: [
      {
        id: "name",
        type: "text",
        name: "name",
        label: "Full Name",
        placeholder: "Enter your full name",
        required: true,
        validation: [{ type: "required", message: "Name is required" }],
      },
      {
        id: "email",
        type: "email",
        name: "email",
        label: "Email Address",
        placeholder: "your@email.com",
        required: true,
        validation: [
          { type: "required", message: "Email is required" },
          { type: "email", message: "Must be a valid email" },
        ],
      },
      {
        id: "phone",
        type: "phone",
        name: "phone",
        label: "Phone Number",
        placeholder: "+91 98765 43210",
      },
      {
        id: "subject",
        type: "select",
        name: "subject",
        label: "Subject",
        required: true,
        options: [
          { label: "General Inquiry", value: "general" },
          { label: "Sales", value: "sales" },
          { label: "Support", value: "support" },
          { label: "Partnership", value: "partnership" },
        ],
      },
      {
        id: "message",
        type: "textarea",
        name: "message",
        label: "Message",
        placeholder: "Enter your message here...",
        required: true,
        rows: 5,
        validation: [
          { type: "required", message: "Message is required" },
          { type: "min", value: 10, message: "Message too short" },
        ],
      },
    ],
    settings: {
      showProgress: false,
      allowDraft: false,
      submitText: "Send Message",
      resetText: "Clear",
      validateOnChange: true,
    },
  },
  {
    id: "customer-feedback",
    title: "Customer Feedback Survey",
    description: "Collect customer satisfaction and feedback",
    version: "1.0.0",
    layout: "vertical",
    columns: 1,
    sections: [
      {
        id: "basic-info",
        title: "Basic Information",
        description: "Tell us about yourself",
        collapsible: false,
        collapsed: false,
        fields: [
          {
            id: "customer-name",
            type: "text",
            name: "customerName",
            label: "Your Name",
            required: true,
          },
          {
            id: "purchase-date",
            type: "date",
            name: "purchaseDate",
            label: "Purchase Date",
            required: true,
          },
          {
            id: "product",
            type: "select",
            name: "product",
            label: "Product/Service",
            required: true,
            options: [
              { label: "Residential Property", value: "residential" },
              { label: "Commercial Property", value: "commercial" },
              { label: "Land Plot", value: "land" },
              { label: "Consulting Services", value: "consulting" },
            ],
          },
        ],
      },
      {
        id: "satisfaction",
        title: "Satisfaction Rating",
        description: "Rate your experience with us",
        collapsible: false,
        collapsed: false,
        fields: [
          {
            id: "overall-rating",
            type: "rating",
            name: "overallRating",
            label: "Overall Satisfaction",
            required: true,
            max: 5,
          },
          {
            id: "service-rating",
            type: "rating",
            name: "serviceRating",
            label: "Customer Service",
            required: true,
            max: 5,
          },
          {
            id: "quality-rating",
            type: "rating",
            name: "qualityRating",
            label: "Product Quality",
            required: true,
            max: 5,
          },
          {
            id: "value-rating",
            type: "rating",
            name: "valueRating",
            label: "Value for Money",
            required: true,
            max: 5,
          },
        ],
      },
      {
        id: "feedback",
        title: "Additional Feedback",
        description: "Help us improve our services",
        collapsible: true,
        collapsed: false,
        fields: [
          {
            id: "liked-most",
            type: "textarea",
            name: "likedMost",
            label: "What did you like most?",
            rows: 3,
          },
          {
            id: "improvements",
            type: "textarea",
            name: "improvements",
            label: "What can we improve?",
            rows: 3,
          },
          {
            id: "recommend",
            type: "radio",
            name: "recommend",
            label: "Would you recommend us to others?",
            required: true,
            options: [
              { label: "Definitely", value: "definitely" },
              { label: "Probably", value: "probably" },
              { label: "Not sure", value: "not-sure" },
              { label: "Probably not", value: "probably-not" },
              { label: "Definitely not", value: "definitely-not" },
            ],
          },
          {
            id: "newsletter",
            type: "checkbox",
            name: "newsletter",
            label: "Subscribe to our newsletter",
          },
        ],
      },
    ],
    settings: {
      showProgress: true,
      allowDraft: true,
      submitText: "Submit Feedback",
      resetText: "Clear Form",
      validateOnChange: true,
    },
  },
];

export default function FormBuilderDemo() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<FormSchema | null>(
    null,
  );

  const handleSave = (schema: FormSchema) => {
    console.log("Form saved:", schema);
    toast({
      title: "Form Saved Successfully",
      description: `Form "${schema.title}" has been saved to your library.`,
    });
  };

  const handleExport = (schema: FormSchema) => {
    const dataStr = JSON.stringify(schema, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${schema.title.replace(/\s+/g, "_")}_form.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Form Exported",
      description: "Form configuration has been downloaded as JSON file.",
    });
  };

  if (selectedTemplate) {
    return (
      <FormBuilder
        initialSchema={selectedTemplate}
        onSave={(schema) => {
          handleSave(schema);
          setSelectedTemplate(null);
        }}
        onPreview={(schema) => {
          console.log("Preview form:", schema);
          toast({
            title: "Preview Mode",
            description: "Form preview functionality would open here.",
          });
        }}
      />
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate("/advanced-patterns")}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Advanced Patterns
            </Button>
            <h1 className="text-4xl font-bold mb-2">Form Builder</h1>
            <p className="text-xl text-muted-foreground">
              Create and customize dynamic forms with drag-and-drop interface
            </p>
          </div>
          <Button
            onClick={() =>
              setSelectedTemplate({
                id: "new-form",
                title: "New Form",
                description: "Create a new form from scratch",
                version: "1.0.0",
                layout: "vertical",
                columns: 1,
                fields: [],
                settings: {
                  showProgress: false,
                  allowDraft: true,
                  submitText: "Submit",
                  resetText: "Reset",
                  validateOnChange: true,
                },
              })
            }
          >
            Create New Form
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formTemplates.map((template) => (
            <Card key={template.id} className="h-full">
              <CardHeader>
                <CardTitle>{template.title}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {template.layout}
                  </span>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    {template.fields?.length ||
                      template.sections?.reduce(
                        (acc, section) => acc + section.fields.length,
                        0,
                      )}{" "}
                    fields
                  </span>
                  {template.sections && (
                    <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      {template.sections.length} sections
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Features:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {template.settings.showProgress && (
                      <li>• Progress tracking</li>
                    )}
                    {template.settings.allowDraft && <li>• Draft saving</li>}
                    {template.settings.validateOnChange && (
                      <li>• Real-time validation</li>
                    )}
                    {template.sections?.some((s) => s.collapsible) && (
                      <li>• Collapsible sections</li>
                    )}
                  </ul>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => setSelectedTemplate(template)}
                  >
                    Edit Template
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExport(template)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Form Builder Features</CardTitle>
              <CardDescription>
                Comprehensive form building capabilities for modern applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Field Types</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Text, Email, Password inputs</li>
                    <li>• Number, Currency, Phone fields</li>
                    <li>• Date, Time, DateTime pickers</li>
                    <li>• Select, Multi-select dropdowns</li>
                    <li>• Radio buttons, Checkboxes</li>
                    <li>• File upload, Image upload</li>
                    <li>• Rich text editor</li>
                    <li>• Rating stars, Color picker</li>
                    <li>• Address fields, Signature</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Advanced Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Conditional logic and visibility</li>
                    <li>• Real-time validation</li>
                    <li>• Multi-step forms</li>
                    <li>• Progress tracking</li>
                    <li>• Draft saving</li>
                    <li>• Auto-save functionality</li>
                    <li>• Section grouping</li>
                    <li>• Collapsible sections</li>
                    <li>• Responsive layouts</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Indian Market Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Indian Rupee (₹) currency format</li>
                    <li>• Indian phone number format</li>
                    <li>• Indian address format</li>
                    <li>• Pincode validation</li>
                    <li>• GST number fields</li>
                    <li>• Aadhaar number format</li>
                    <li>• PAN card validation</li>
                    <li>• Regional language support</li>
                    <li>• Compliance templates</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
