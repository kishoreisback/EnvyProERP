import React, { useState, useEffect } from "react";
import { FormSchema, FieldSchema } from "../forms/types";
import { FormBuilder } from "../forms/FormBuilder";
import { AIAssistantChat } from "./AIAssistantChat";
import { AISuggestion, FormAnalysisResult } from "./types";
import { AIFormGenerator } from "./AIFormGenerator";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { ScrollArea } from "../../ui/scroll-area";
import { Separator } from "../../ui/separator";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../ui/resizable";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import {
  Bot,
  Sparkles,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Target,
  Zap,
  Brain,
  Wand2,
  BarChart3,
  Shield,
  Clock,
} from "lucide-react";
import { cn } from "../../../lib/utils";
import { useToast } from "../../ui/use-toast";

interface AIEnhancedFormBuilderProps {
  initialSchema?: FormSchema;
  onSave: (schema: FormSchema) => void;
  onPreview?: (schema: FormSchema) => void;
}

export function AIEnhancedFormBuilder({
  initialSchema,
  onSave,
  onPreview,
}: AIEnhancedFormBuilderProps) {
  const { toast } = useToast();
  const [currentSchema, setCurrentSchema] = useState<FormSchema>(
    initialSchema || {
      id: "ai-form",
      title: "New AI Form",
      description: "Form created with AI assistance",
      version: "1.0.0",
      layout: "vertical",
      fields: [],
      settings: {
        showProgress: false,
        allowDraft: true,
        submitText: "Submit",
        resetText: "Reset",
        validateOnChange: true,
      },
    },
  );

  const [analysisResult, setAnalysisResult] =
    useState<FormAnalysisResult | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [appliedSuggestions, setAppliedSuggestions] = useState<Set<string>>(
    new Set(),
  );
  const [aiInsights, setAiInsights] = useState<{
    score: number;
    improvements: number;
    lastAnalyzed: Date;
  } | null>(null);

  // Auto-analyze form when it changes
  useEffect(() => {
    if (currentSchema.fields && currentSchema.fields.length > 0) {
      const analysis = AIFormGenerator.analyzeForm(currentSchema);
      setAnalysisResult(analysis);
      setAiInsights({
        score: analysis.score,
        improvements: analysis.suggestions.length,
        lastAnalyzed: new Date(),
      });
    }
  }, [currentSchema]);

  // Handle AI-generated form
  const handleAIFormGenerated = (aiSchema: FormSchema) => {
    setCurrentSchema(aiSchema);
    toast({
      title: "AI Form Generated",
      description: "Your form has been created with AI assistance!",
    });
  };

  // Handle AI suggestion application
  const handleSuggestionApplied = (suggestion: AISuggestion) => {
    let updatedSchema = { ...currentSchema };

    switch (suggestion.action.type) {
      case "add_field":
        if (suggestion.action.payload.field) {
          updatedSchema.fields = [
            ...(updatedSchema.fields || []),
            suggestion.action.payload.field,
          ];
        }
        break;

      case "modify_field":
        if (
          suggestion.action.payload.fieldName &&
          suggestion.action.payload.updates
        ) {
          updatedSchema.fields = updatedSchema.fields?.map((field) =>
            field.name === suggestion.action.payload.fieldName
              ? { ...field, ...suggestion.action.payload.updates }
              : field,
          );
        }
        break;

      case "add_validation":
        if (suggestion.action.payload.fields) {
          updatedSchema.fields = updatedSchema.fields?.map((field) => {
            if (suggestion.action.payload.fields.includes(field.name)) {
              return {
                ...field,
                validation: [
                  ...(field.validation || []),
                  { type: "required", message: `${field.label} is required` },
                ],
                required: true,
              };
            }
            return field;
          });
        }
        break;

      case "optimize":
        switch (suggestion.action.payload.suggestion) {
          case "split_sections":
            // Convert flat fields to sections
            if (updatedSchema.fields && updatedSchema.fields.length > 6) {
              const fieldsPerSection = Math.ceil(
                updatedSchema.fields.length / 2,
              );
              updatedSchema.sections = [
                {
                  id: "section1",
                  title: "Basic Information",
                  description: "Essential details",
                  collapsible: false,
                  collapsed: false,
                  fields: updatedSchema.fields.slice(0, fieldsPerSection),
                },
                {
                  id: "section2",
                  title: "Additional Details",
                  description: "Supplementary information",
                  collapsible: false,
                  collapsed: false,
                  fields: updatedSchema.fields.slice(fieldsPerSection),
                },
              ];
              updatedSchema.fields = undefined;
            }
            break;
        }

        if (suggestion.action.payload.setting) {
          updatedSchema.settings = {
            ...updatedSchema.settings,
            [suggestion.action.payload.setting]:
              suggestion.action.payload.value,
          };
        }
        break;
    }

    setCurrentSchema(updatedSchema);
    setAppliedSuggestions((prev) => new Set([...prev, suggestion.id]));
  };

  // Smart field suggestions based on current form
  const getSmartSuggestions = (): AISuggestion[] => {
    if (!analysisResult) return [];

    return analysisResult.suggestions.filter(
      (suggestion) => !appliedSuggestions.has(suggestion.id),
    );
  };

  // Get form score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  // Get score icon
  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (score >= 60)
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    return <AlertTriangle className="h-4 w-4 text-red-600" />;
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b p-4 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AI-Enhanced Form Builder</h1>
                <p className="text-sm text-muted-foreground">
                  Create intelligent forms with AI assistance
                </p>
              </div>
            </div>

            {/* AI Insights */}
            {aiInsights && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-1 bg-muted rounded-full">
                  <Target className="h-4 w-4" />
                  <span className="text-sm font-medium">Score:</span>
                  <span
                    className={cn(
                      "text-sm font-bold",
                      getScoreColor(aiInsights.score),
                    )}
                  >
                    {aiInsights.score}/100
                  </span>
                  {getScoreIcon(aiInsights.score)}
                </div>

                {aiInsights.improvements > 0 && (
                  <Badge
                    variant="secondary"
                    className="flex items-center space-x-1"
                  >
                    <Lightbulb className="h-3 w-3" />
                    <span>{aiInsights.improvements} suggestions</span>
                  </Badge>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAnalysis(true)}
              disabled={!analysisResult}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              View Analysis
            </Button>
            <Button size="sm" onClick={() => onSave(currentSchema)}>
              <Zap className="h-4 w-4 mr-2" />
              Save Form
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Form Builder */}
          <ResizablePanel defaultSize={70} minSize={50}>
            <div className="h-full overflow-auto">
              <FormBuilder
                initialSchema={currentSchema}
                onSave={(schema) => {
                  setCurrentSchema(schema);
                  onSave(schema);
                }}
                onPreview={onPreview}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* AI Assistant Panel */}
          <ResizablePanel defaultSize={30} minSize={25} maxSize={40}>
            <div className="h-full flex flex-col">
              <Tabs defaultValue="assistant" className="flex-1 flex flex-col">
                <TabsList className="mx-4 mt-4">
                  <TabsTrigger
                    value="assistant"
                    className="flex items-center space-x-2"
                  >
                    <Bot className="h-4 w-4" />
                    <span>AI Assistant</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="suggestions"
                    className="flex items-center space-x-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Suggestions</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="assistant" className="flex-1 m-4 mt-2">
                  <AIAssistantChat
                    onFormGenerated={handleAIFormGenerated}
                    onSuggestionApplied={handleSuggestionApplied}
                    currentForm={currentSchema}
                    className="h-full"
                  />
                </TabsContent>

                <TabsContent value="suggestions" className="flex-1 m-4 mt-2">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Lightbulb className="h-5 w-5" />
                        <span>Smart Suggestions</span>
                        {analysisResult && (
                          <Badge variant="outline">
                            {analysisResult.suggestions.length} available
                          </Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[calc(100vh-12rem)]">
                        <div className="space-y-3">
                          {getSmartSuggestions().map((suggestion) => (
                            <Card key={suggestion.id} className="p-3">
                              <div className="space-y-2">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h4 className="text-sm font-medium">
                                      {suggestion.title}
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                      {suggestion.description}
                                    </p>
                                  </div>
                                  <Badge
                                    variant={
                                      suggestion.impact === "high"
                                        ? "destructive"
                                        : suggestion.impact === "medium"
                                          ? "default"
                                          : "secondary"
                                    }
                                    className="ml-2 text-xs"
                                  >
                                    {suggestion.impact}
                                  </Badge>
                                </div>

                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                    <TrendingUp className="h-3 w-3" />
                                    <span>
                                      {Math.round(suggestion.confidence * 100)}%
                                      confidence
                                    </span>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() =>
                                      handleSuggestionApplied(suggestion)
                                    }
                                  >
                                    <Wand2 className="h-3 w-3 mr-1" />
                                    Apply
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ))}

                          {getSmartSuggestions().length === 0 && (
                            <div className="text-center py-8">
                              <CheckCircle className="h-8 w-8 mx-auto text-green-500 mb-2" />
                              <p className="text-sm text-muted-foreground">
                                No suggestions available. Your form looks great!
                              </p>
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Analysis Dialog */}
      <Dialog open={showAnalysis} onOpenChange={setShowAnalysis}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Form Analysis Report</span>
            </DialogTitle>
            <DialogDescription>
              Comprehensive AI analysis of your form's performance and usability
            </DialogDescription>
          </DialogHeader>

          {analysisResult && (
            <div className="space-y-6">
              {/* Overall Score */}
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  <span className={getScoreColor(analysisResult.score)}>
                    {analysisResult.score}/100
                  </span>
                </div>
                <p className="text-muted-foreground">Overall Form Score</p>
              </div>

              {/* Detailed Scores */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-1">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Usability</span>
                  </div>
                  <div className="text-xl font-bold text-blue-600">
                    {analysisResult.usabilityScore}
                  </div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-1">
                    <Zap className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Performance</span>
                  </div>
                  <div className="text-xl font-bold text-green-600">
                    {analysisResult.performanceScore}
                  </div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-1">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium">Compliance</span>
                  </div>
                  <div className="text-xl font-bold text-purple-600">
                    {analysisResult.complianceScore}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Key Insights */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center space-x-2">
                  <Brain className="h-4 w-4" />
                  <span>Key Insights</span>
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        ~{analysisResult.insights.estimatedCompletionTime} min
                        completion
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {analysisResult.completionRate}% expected completion
                        rate
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {analysisResult.insights.fieldCount} total fields
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          analysisResult.insights.complexityLevel === "simple"
                            ? "default"
                            : analysisResult.insights.complexityLevel ===
                                "moderate"
                              ? "secondary"
                              : "destructive"
                        }
                        className="text-xs"
                      >
                        {analysisResult.insights.complexityLevel} complexity
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              {analysisResult.insights.recommendedImprovements.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3 flex items-center space-x-2">
                    <Lightbulb className="h-4 w-4" />
                    <span>Recommended Improvements</span>
                  </h3>
                  <ul className="space-y-1">
                    {analysisResult.insights.recommendedImprovements.map(
                      (improvement, index) => (
                        <li
                          key={index}
                          className="text-sm flex items-start space-x-2"
                        >
                          <span className="text-muted-foreground">•</span>
                          <span>{improvement}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
