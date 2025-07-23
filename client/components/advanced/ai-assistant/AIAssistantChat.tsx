import React, { useState, useRef, useEffect } from "react";
import {
  AIMessage,
  AISuggestion,
  FormAnalysisResult,
  AI_RESPONSES,
  RecognizedIntent,
} from "./types";
import { FormSchema } from "../forms/types";
import { AIFormGenerator } from "./AIFormGenerator";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { ScrollArea } from "../../ui/scroll-area";
import { Separator } from "../../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
  Send,
  Bot,
  User,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Clock,
  TrendingUp,
  FileText,
  Wand2,
} from "lucide-react";
import { cn } from "../../../lib/utils";
import { useToast } from "../../ui/use-toast";

interface AIAssistantChatProps {
  onFormGenerated: (form: FormSchema) => void;
  onSuggestionApplied: (suggestion: AISuggestion) => void;
  currentForm?: FormSchema;
  className?: string;
}

export function AIAssistantChat({
  onFormGenerated,
  onSuggestionApplied,
  currentForm,
  className,
}: AIAssistantChatProps) {
  const { toast } = useToast();
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: AI_RESPONSES.GREETING,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isThinking) return;

    const userMessage: AIMessage = {
      id: `user_${Date.now()}`,
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsThinking(true);

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const response = await processUserMessage(inputValue);
      setMessages((prev) => [...prev, response]);

      // If response includes form schema, trigger callback
      if (response.metadata?.formSchema) {
        onFormGenerated(response.metadata.formSchema);
      }

      // Update suggestions if provided
      if (response.metadata?.suggestions) {
        setSuggestions(response.metadata.suggestions);
      }
    } catch (error) {
      const errorMessage: AIMessage = {
        id: `error_${Date.now()}`,
        role: "assistant",
        content: AI_RESPONSES.ERROR,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setIsThinking(false);
  };

  // Process user message and generate AI response
  const processUserMessage = async (message: string): Promise<AIMessage> => {
    const intent = AIFormGenerator.recognizeIntent(message);
    const startTime = Date.now();

    let responseContent = "";
    let formSchema: FormSchema | undefined;
    let suggestions: AISuggestion[] = [];

    switch (intent.intent) {
      case "create_form":
        responseContent = await handleFormCreation(message, intent);
        formSchema = AIFormGenerator.generateFormFromDescription(
          message,
          intent.context,
        );
        break;

      case "analyze_form":
        if (currentForm) {
          const analysis = AIFormGenerator.analyzeForm(currentForm);
          responseContent = formatAnalysisResponse(analysis);
          suggestions = analysis.suggestions;
        } else {
          responseContent =
            "I'd be happy to analyze a form for you. Please create or select a form first, then ask me to analyze it.";
        }
        break;

      case "suggest_improvements":
        if (currentForm) {
          const analysis = AIFormGenerator.analyzeForm(currentForm);
          responseContent = formatImprovementSuggestions(analysis.suggestions);
          suggestions = analysis.suggestions;
        } else {
          responseContent =
            "To suggest improvements, I need to see your current form. Please create or select a form first.";
        }
        break;

      case "add_field":
        responseContent = handleFieldAddition(message);
        break;

      default:
        responseContent = handleGeneralQuery(message, intent);
    }

    const processingTime = Date.now() - startTime;

    return {
      id: `ai_${Date.now()}`,
      role: "assistant",
      content: responseContent,
      timestamp: new Date(),
      metadata: {
        formSchema,
        suggestions,
        confidence: intent.confidence,
        processingTime,
      },
    };
  };

  // Handle form creation requests
  const handleFormCreation = async (
    message: string,
    intent: RecognizedIntent,
  ): Promise<string> => {
    const formType = intent.entities.formType || "custom form";

    return `I've created a comprehensive ${formType} for you! Here's what I included:

📋 **Form Features:**
• ${intent.entities.fieldTypes?.length || "Multiple"} field types optimized for your needs
• Indian compliance fields (where applicable)
• Smart validation rules
• Mobile-responsive design
• Professional styling

🎯 **Key Highlights:**
• Pre-configured for ${intent.context.industry || "general"} industry
• Follows Indian business standards
• Optimized for high completion rates
• Ready for immediate use

The form has been generated and is ready for you to review and customize further. You can modify any fields, add sections, or adjust the layout as needed.

Would you like me to suggest any specific improvements or add additional fields?`;
  };

  // Format analysis response
  const formatAnalysisResponse = (analysis: FormAnalysisResult): string => {
    return `I've analyzed your form and here's my assessment:

📊 **Overall Score: ${analysis.score}/100**

**Detailed Breakdown:**
• Usability Score: ${analysis.usabilityScore}/100
• Performance Score: ${analysis.performanceScore}/100
• Compliance Score: ${analysis.complianceScore}/100

📈 **Key Insights:**
• ${analysis.insights.fieldCount} total fields
• ${analysis.insights.complexityLevel} complexity level
• ~${analysis.insights.estimatedCompletionTime} minutes completion time
• ${analysis.completionRate}% expected completion rate

${
  analysis.suggestions.length > 0
    ? `🔧 **Top Recommendations:**
${analysis.suggestions
  .slice(0, 3)
  .map((s) => `• ${s.title}: ${s.description}`)
  .join("\n")}

I can help you implement these improvements automatically. Just let me know which ones you'd like to apply!`
    : "✅ Your form looks great! No major improvements needed."
}`;
  };

  // Format improvement suggestions
  const formatImprovementSuggestions = (
    suggestions: AISuggestion[],
  ): string => {
    if (suggestions.length === 0) {
      return "Great news! Your form is already well-optimized. I don't see any major improvements needed at this time.";
    }

    return `I've identified ${suggestions.length} ways to improve your form:

${suggestions
  .map(
    (s, index) =>
      `${index + 1}. **${s.title}** (${s.impact} impact)
   ${s.description}
   
   *Why this matters:* ${s.reasoning}
`,
  )
  .join("\n")}

Would you like me to apply any of these improvements automatically? I can implement them one by one or all at once.`;
  };

  // Handle field addition requests
  const handleFieldAddition = (message: string): string => {
    const fieldTypes = [
      "email",
      "phone",
      "address",
      "currency",
      "rating",
      "file",
    ];
    const mentionedType = fieldTypes.find((type) =>
      message.toLowerCase().includes(type),
    );

    if (mentionedType) {
      return `Great idea! I recommend adding a ${mentionedType} field. Here's what I suggest:

**Field Configuration:**
• Type: ${mentionedType.charAt(0).toUpperCase() + mentionedType.slice(1)} field
• Required: ${mentionedType === "email" || mentionedType === "phone" ? "Yes" : "Optional"}
• Validation: Smart validation rules included
• Format: ${mentionedType === "phone" ? "Indian format (+91)" : "Standard format"}

I can add this field to your form automatically with optimized settings. Would you like me to proceed?`;
    }

    return `I'd be happy to help you add a field! Could you specify what type of field you need? For example:
    
• Contact fields (email, phone, address)
• Business fields (currency, date, rating)  
• Upload fields (file, image, signature)
• Input fields (text, number, dropdown)

Just let me know what information you want to collect and I'll suggest the best field type and configuration.`;
  };

  // Handle general queries
  const handleGeneralQuery = (
    message: string,
    intent: RecognizedIntent,
  ): string => {
    const lowerMessage = message.toLowerCase();

    if (
      lowerMessage.includes("help") ||
      lowerMessage.includes("what can you do")
    ) {
      return `I'm your AI Form Builder Assistant! Here's how I can help you:

���� **Create Forms:**
• "Create an employee onboarding form"
• "Build a customer feedback survey"
• "Generate a project request form"

📊 **Analyze & Optimize:**
• "Analyze my current form"
• "How can I improve completion rates?"
• "Suggest better validation rules"

⚡ **Smart Suggestions:**
• Add missing fields automatically
• Optimize for mobile devices
• Ensure Indian compliance
• Improve user experience

🔧 **Field Management:**
• "Add an email field"
• "Remove unnecessary fields"
• "Change field validation"

Just describe what you want in natural language, and I'll take care of the technical details!`;
    }

    if (lowerMessage.includes("example") || lowerMessage.includes("template")) {
      return `Here are some popular form templates I can create for you:

**Business Forms:**
• Employee Onboarding Form
• Project Request Form
• Supplier Registration Form
• Performance Review Form

**Customer Forms:**
• Customer Feedback Survey
• Service Request Form
• Contact Us Form
• Event Registration Form

**Compliance Forms:**
• Safety Inspection Checklist
• Audit Compliance Form
• Incident Report Form
• Training Completion Form

Just say something like "Create an employee onboarding form" and I'll build it for you with all the necessary fields and Indian compliance requirements!`;
    }

    return `I understand you're asking about "${message}". While I specialize in form building and optimization, I'd be happy to help if you could be more specific about what kind of form assistance you need.

Try asking me to:
• Create a specific type of form
• Analyze your current form
• Suggest improvements
• Add or modify fields

What would you like to work on today?`;
  };

  // Handle suggestion application
  const handleApplySuggestion = (suggestion: AISuggestion) => {
    onSuggestionApplied(suggestion);
    toast({
      title: "Suggestion Applied",
      description: `${suggestion.title} has been applied to your form.`,
    });

    // Add confirmation message
    const confirmationMessage: AIMessage = {
      id: `confirmation_${Date.now()}`,
      role: "assistant",
      content: `✅ I've applied the "${suggestion.title}" improvement to your form. The changes should help ${suggestion.reasoning.toLowerCase()}`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, confirmationMessage]);
  };

  // Quick action buttons
  const quickActions = [
    {
      label: "Create Employee Form",
      action: () => setInputValue("Create an employee onboarding form"),
      icon: <User className="h-4 w-4" />,
    },
    {
      label: "Project Request Form",
      action: () => setInputValue("Generate a project request form"),
      icon: <FileText className="h-4 w-4" />,
    },
    {
      label: "Analyze Current Form",
      action: () => setInputValue("Analyze my current form for improvements"),
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      label: "Optimize for Mobile",
      action: () => setInputValue("Optimize this form for mobile devices"),
      icon: <Sparkles className="h-4 w-4" />,
    },
  ];

  return (
    <Card className={cn("flex flex-col h-full", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <span>AI Form Assistant</span>
          <Badge variant="secondary" className="ml-auto">
            <Sparkles className="h-3 w-3 mr-1" />
            Powered by AI
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* Quick Actions */}
        {messages.length <= 1 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Quick actions to get started:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={action.action}
                  className="justify-start h-auto p-3"
                >
                  {action.icon}
                  <span className="ml-2 text-xs">{action.label}</span>
                </Button>
              ))}
            </div>
            <Separator />
          </div>
        )}

        {/* Messages */}
        <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex space-x-3",
                  message.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3 space-y-2",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-muted",
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </p>

                  {message.metadata?.processingTime && (
                    <div className="flex items-center space-x-2 text-xs opacity-70">
                      <Clock className="h-3 w-3" />
                      <span>{message.metadata.processingTime}ms</span>
                    </div>
                  )}
                </div>

                {message.role === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isThinking && (
              <div className="flex space-x-3 justify-start">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-100" />
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-200" />
                    </div>
                    <span className="text-muted-foreground">
                      AI is thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="space-y-2">
            <Separator />
            <p className="text-sm font-medium flex items-center space-x-2">
              <Lightbulb className="h-4 w-4" />
              <span>AI Suggestions</span>
            </p>
            <div className="space-y-2">
              {suggestions.slice(0, 3).map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="flex items-center justify-between p-2 bg-muted/50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium">{suggestion.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {suggestion.description}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleApplySuggestion(suggestion)}
                  >
                    <Wand2 className="h-3 w-3 mr-1" />
                    Apply
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Describe the form you want to create..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            disabled={isThinking}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isThinking}
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
