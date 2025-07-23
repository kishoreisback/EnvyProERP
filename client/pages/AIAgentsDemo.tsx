import React, { useState } from "react";
import { MainLayout } from "../components/layout/MainLayout";
import { AIAgentsDashboard } from "../components/advanced/ai-agents";
import { AIAgentResults } from "../components/advanced/ai-agents/AIAgentResults";
import { AIErrorBoundary } from "../components/advanced/ai-agents/AIErrorBoundary";
import { AIAgentEngine } from "../components/advanced/ai-agents/AIAgentEngine";
import {
  AIAgent,
  AIAgentResult,
  AIAgentExecution,
} from "../components/advanced/ai-agents/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Switch } from "../components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  ArrowLeft,
  Bot,
  Brain,
  Zap,
  FileText,
  TrendingUp,
  Shield,
  DollarSign,
  Users,
  Calendar,
  BarChart3,
  CheckCircle,
  Eye,
  Activity,
  Send,
  Upload,
  Download,
  Settings,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useToast } from "../components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export default function AIAgentsDemo() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [chatQuery, setChatQuery] = useState("");
  const [chatHistory, setChatHistory] = useState<
    Array<{ type: "user" | "ai"; message: string; timestamp: Date }>
  >([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [demoResults, setDemoResults] = useState<
    Record<string, AIAgentResult[]>
  >({});
  const [showDemoResults, setShowDemoResults] = useState(false);
  const [selectedDemoAgent, setSelectedDemoAgent] = useState<AIAgent | null>(
    null,
  );

  const engine = AIAgentEngine.getInstance();

  const handleChatSubmit = async () => {
    if (!chatQuery.trim()) return;

    const userMessage = {
      type: "user" as const,
      message: chatQuery,
      timestamp: new Date(),
    };

    setChatHistory((prev) => [...prev, userMessage]);
    setIsProcessing(true);

    try {
      // Process with AI Assistant
      const result = await engine.processNaturalLanguageQuery(
        "agent-smart-assistant",
        chatQuery,
      );

      const aiMessage = {
        type: "ai" as const,
        message: result.data.response,
        timestamp: new Date(),
      };

      setChatHistory((prev) => [...prev, aiMessage]);

      toast({
        title: "AI Response Generated",
        description: `Processed with ${Math.round(result.confidence * 100)}% confidence`,
      });
    } catch (error) {
      toast({
        title: "Processing Error",
        description: "Failed to process your query. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setChatQuery("");
    }
  };

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsProcessing(true);

    try {
      // Process document with AI
      const result = await engine.processDocument(
        "agent-doc-processor",
        file.name,
      );

      toast({
        title: "Document Processed",
        description: `Extracted ${result.data.entities.length} entities with ${Math.round(result.confidence * 100)}% confidence`,
      });

      // Add to chat history
      const aiMessage = {
        type: "ai" as const,
        message: `Document "${file.name}" processed successfully. ${result.insights.join(". ")}.`,
        timestamp: new Date(),
      };

      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "Processing Error",
        description: "Failed to process document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const runDemoAnalysis = async (type: string) => {
    setIsProcessing(true);

    try {
      let result;
      let message = "";

      switch (type) {
        case "risk":
          result = await engine.analyzeProjectRisk("agent-risk-analyzer", {
            id: "demo-project",
            budget: 5000000,
            timeline: 180,
          });
          message = `Risk analysis completed. Overall risk level: ${result.data.overallRisk}. ${result.insights.join(". ")}.`;
          break;

        case "cost":
          result = await engine.predictProjectCost("agent-cost-predictor", {
            type: "commercial",
            size: 25000,
            location: "Mumbai",
          });
          message = `Cost prediction completed. Estimated cost: ₹${(result.data.estimatedCost / 100000).toFixed(1)}L. ${result.insights.join(". ")}.`;
          break;

        case "safety":
          result = await engine.analyzeSafetyCompliance(
            "agent-safety-monitor",
            {
              site: "demo-site",
              date: new Date(),
            },
          );
          message = `Safety analysis completed. Compliance score: ${result.data.complianceScore}%. ${result.insights.join(". ")}.`;
          break;

        default:
          throw new Error("Unknown analysis type");
      }

      // Store result for demo viewing
      const agentId = `agent-${type}-analyzer`;
      setDemoResults((prev) => ({
        ...prev,
        [agentId]: [result, ...(prev[agentId] || [])].slice(0, 5),
      }));

      const aiMessage = {
        type: "ai" as const,
        message,
        timestamp: new Date(),
      };

      setChatHistory((prev) => [...prev, aiMessage]);

      toast({
        title: "Analysis Completed",
        description: `${type} analysis finished with ${Math.round(result.confidence * 100)}% confidence. Click 'View Results' to see details.`,
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to run analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const demoQueries = [
    "What is the status of Project Alpha?",
    "Show me the budget analysis for this quarter",
    "Are there any safety violations this week?",
    "Which vendors have the best performance ratings?",
    "Generate a cost prediction for a 50,000 sq ft office building",
    "What are the current project risks?",
  ];

  const aiCapabilities = [
    {
      icon: FileText,
      title: "Document Intelligence",
      description: "Process invoices, contracts, permits with 95% accuracy",
      color: "text-blue-500",
    },
    {
      icon: TrendingUp,
      title: "Risk Analysis",
      description: "Predict project risks and suggest mitigation strategies",
      color: "text-red-500",
    },
    {
      icon: DollarSign,
      title: "Cost Prediction",
      description: "Estimate project costs with ±8% accuracy using AI",
      color: "text-green-500",
    },
    {
      icon: Shield,
      title: "Safety Monitoring",
      description: "Real-time safety compliance monitoring and alerts",
      color: "text-orange-500",
    },
    {
      icon: Users,
      title: "Vendor Analytics",
      description: "Analyze vendor performance and recommend alternatives",
      color: "text-purple-500",
    },
    {
      icon: Brain,
      title: "Smart Assistant",
      description: "Natural language ERP queries and task automation",
      color: "text-indigo-500",
    },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/advanced-patterns")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Advanced Patterns
            </Button>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">AI Agents & Automations</h1>
                <p className="text-muted-foreground">
                  Intelligent automation for construction ERP
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Activity className="h-3 w-3 mr-1" />5 Agents Active
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <Zap className="h-3 w-3 mr-1" />
              Real AI Processing
            </Badge>
          </div>
        </div>

        {/* AI Capabilities Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              <span>AI Capabilities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiCapabilities.map((capability, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <capability.icon
                    className={`h-5 w-5 ${capability.color} mt-0.5`}
                  />
                  <div>
                    <h4 className="font-medium text-sm">{capability.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {capability.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">AI Agents Dashboard</TabsTrigger>
            <TabsTrigger value="chat">AI Assistant Chat</TabsTrigger>
            <TabsTrigger value="automations">Smart Automations</TabsTrigger>
          </TabsList>

          {/* AI Agents Dashboard */}
          <TabsContent value="dashboard">
            <AIErrorBoundary>
              <AIAgentsDashboard />
            </AIErrorBoundary>
          </TabsContent>

          {/* AI Assistant Chat */}
          <TabsContent value="chat" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chat Interface */}
              <div className="lg:col-span-2">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="h-5 w-5 text-blue-500" />
                      <span>BuildPro AI Assistant</span>
                      {isProcessing && (
                        <Badge variant="secondary">
                          <Activity className="h-3 w-3 mr-1 animate-spin" />
                          Processing...
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col space-y-4">
                    {/* Chat History */}
                    <div className="flex-1 overflow-y-auto space-y-3 p-4 bg-muted/20 rounded-lg">
                      {chatHistory.length === 0 && (
                        <div className="text-center text-muted-foreground py-8">
                          <Brain className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>
                            Ask me anything about your construction projects!
                          </p>
                        </div>
                      )}
                      {chatHistory.map((chat, index) => (
                        <div
                          key={index}
                          className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              chat.type === "user"
                                ? "bg-blue-500 text-white"
                                : "bg-white border shadow-sm"
                            }`}
                          >
                            <p className="text-sm">{chat.message}</p>
                            <p
                              className={`text-xs mt-1 ${
                                chat.type === "user"
                                  ? "text-blue-100"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {chat.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chat Input */}
                    <div className="flex space-x-2">
                      <div className="flex-1">
                        <Input
                          value={chatQuery}
                          onChange={(e) => setChatQuery(e.target.value)}
                          placeholder="Ask about projects, costs, risks, safety..."
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleChatSubmit()
                          }
                          disabled={isProcessing}
                        />
                      </div>
                      <Button
                        onClick={handleChatSubmit}
                        disabled={!chatQuery.trim() || isProcessing}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => runDemoAnalysis("risk")}
                      disabled={isProcessing}
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Analyze Project Risk
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => runDemoAnalysis("cost")}
                      disabled={isProcessing}
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Predict Project Cost
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => runDemoAnalysis("safety")}
                      disabled={isProcessing}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Safety Compliance Check
                    </Button>

                    <div className="border-t pt-3">
                      <Button
                        variant="default"
                        className="w-full"
                        onClick={() => {
                          // Create a demo agent for results viewing
                          const demoAgent: AIAgent = {
                            id: "demo-agent",
                            name: "Demo Analysis Agent",
                            type: "smart_assistant",
                            description:
                              "Demo agent for viewing analysis results",
                            status: "active",
                            capabilities: [],
                            config: {
                              enabled: true,
                              autoExecute: false,
                              confidenceThreshold: 0.8,
                              maxProcessingTime: 30,
                              retryAttempts: 3,
                              escalationRules: {
                                lowConfidence: true,
                                errors: true,
                                timeout: true,
                              },
                              integrations: {
                                email: false,
                                slack: false,
                                crm: false,
                                hrms: false,
                              },
                            },
                            triggers: ["manual"],
                            executionCount: 0,
                            successRate: 0.95,
                            averageProcessingTime: 8,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                          };
                          setSelectedDemoAgent(demoAgent);
                          setShowDemoResults(true);
                        }}
                        disabled={Object.keys(demoResults).length === 0}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Demo Results
                      </Button>
                    </div>

                    <div className="border-t pt-3">
                      <label className="block text-sm font-medium mb-2">
                        Upload Document
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file);
                        }}
                        className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        disabled={isProcessing}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Sample Queries</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {demoQueries.map((query, index) => (
                      <button
                        key={index}
                        onClick={() => setChatQuery(query)}
                        className="w-full text-left p-2 text-sm bg-muted/50 rounded hover:bg-muted transition-colors"
                        disabled={isProcessing}
                      >
                        "{query}"
                      </button>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Smart Automations */}
          <TabsContent value="automations">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Automations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <div>
                        <h4 className="font-medium">Invoice Processing</h4>
                        <p className="text-sm text-muted-foreground">
                          Auto-extract data from vendor invoices
                        </p>
                      </div>
                    </div>
                    <Switch checked />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="h-5 w-5 text-red-500" />
                      <div>
                        <h4 className="font-medium">Risk Monitoring</h4>
                        <p className="text-sm text-muted-foreground">
                          Daily project risk assessment
                        </p>
                      </div>
                    </div>
                    <Switch checked />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-orange-500" />
                      <div>
                        <h4 className="font-medium">Safety Alerts</h4>
                        <p className="text-sm text-muted-foreground">
                          Real-time safety compliance monitoring
                        </p>
                      </div>
                    </div>
                    <Switch checked />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-5 w-5 text-green-500" />
                      <div>
                        <h4 className="font-medium">Budget Tracking</h4>
                        <p className="text-sm text-muted-foreground">
                          Automated budget variance alerts
                        </p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Automation Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        2,456
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Tasks Automated
                      </div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        1,840h
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Time Saved
                      </div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        97.3%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Accuracy Rate
                      </div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        ₹24.5L
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Cost Savings
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Recent Automations</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span>Invoice #INV-2024-001 processed</span>
                        <span className="text-muted-foreground">2 min ago</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Project Alpha risk assessment</span>
                        <span className="text-muted-foreground">1h ago</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Safety compliance check - Site B</span>
                        <span className="text-muted-foreground">2h ago</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Vendor performance analysis</span>
                        <span className="text-muted-foreground">4h ago</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Demo Results Modal */}
        {selectedDemoAgent && showDemoResults && (
          <AIAgentResults
            key={selectedDemoAgent.id}
            open={showDemoResults}
            onOpenChange={(open) => {
              setShowDemoResults(open);
              if (!open) {
                setSelectedDemoAgent(null);
              }
            }}
            agent={selectedDemoAgent}
            results={Object.values(demoResults).flat()}
            executions={[]}
          />
        )}
      </div>
    </MainLayout>
  );
}
