import React, { useState, useEffect, useCallback } from "react";
import {
  AIAgent,
  AIAgentExecution,
  AIAgentResult,
  AIAgentDashboard,
  AIInsight,
} from "./types";
import { AIAgentCard } from "./AIAgentCard";
import { AIAgentResults } from "./AIAgentResults";
import { AIAgentConfiguration } from "./AIAgentConfiguration";
import { AIAgentEngine } from "./AIAgentEngine";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  Activity,
  Bot,
  TrendingUp,
  Clock,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Search,
  Filter,
  Plus,
  Zap,
  Brain,
  Target,
  Users,
} from "lucide-react";
import { useToast } from "../../ui/use-toast";
import { cn } from "../../../lib/utils";

interface AIAgentsDashboardProps {
  className?: string;
}

export function AIAgentsDashboard({ className }: AIAgentsDashboardProps) {
  const { toast } = useToast();
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [executions, setExecutions] = useState<AIAgentExecution[]>([]);
  const [results, setResults] = useState<Record<string, AIAgentResult[]>>({});
  const [dashboardData, setDashboardData] = useState<AIAgentDashboard | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showConfiguration, setShowConfiguration] = useState(false);
  const [configureAgent, setConfigureAgent] = useState<AIAgent | null>(null);

  const engine = AIAgentEngine.getInstance();

  // Initialize with sample agents
  useEffect(() => {
    initializeSampleAgents();
  }, []);

  // Update dashboard data
  useEffect(() => {
    updateDashboardData();
  }, [agents, executions]);

  const initializeSampleAgents = () => {
    const sampleAgents: AIAgent[] = [
      {
        id: "agent-doc-processor",
        name: "Document Intelligence",
        type: "document_processor",
        description: "AI-powered document processing and data extraction",
        status: "active",
        capabilities: [
          {
            id: "text-extraction",
            name: "Text Extraction",
            description: "Extract text from PDFs and images",
            inputTypes: ["pdf", "image"],
            outputTypes: ["text", "json"],
            confidence: 0.95,
          },
          {
            id: "entity-recognition",
            name: "Entity Recognition",
            description: "Identify and extract key entities",
            inputTypes: ["text"],
            outputTypes: ["entities"],
            confidence: 0.88,
          },
        ],
        config: {
          enabled: true,
          autoExecute: true,
          confidenceThreshold: 0.8,
          maxProcessingTime: 30,
          retryAttempts: 3,
          escalationRules: {
            lowConfidence: true,
            errors: true,
            timeout: true,
          },
          integrations: {
            email: true,
            slack: false,
            crm: true,
            hrms: false,
          },
        },
        triggers: ["document_upload", "api_call"],
        executionCount: 147,
        successRate: 0.94,
        averageProcessingTime: 8,
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date(),
        lastExecuted: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      {
        id: "agent-risk-analyzer",
        name: "Project Risk Analyzer",
        type: "risk_analyzer",
        description: "Intelligent project risk assessment and prediction",
        status: "active",
        capabilities: [
          {
            id: "risk-assessment",
            name: "Risk Assessment",
            description: "Analyze project risks and dependencies",
            inputTypes: ["project_data"],
            outputTypes: ["risk_report"],
            confidence: 0.87,
          },
          {
            id: "prediction",
            name: "Risk Prediction",
            description: "Predict future risk scenarios",
            inputTypes: ["historical_data"],
            outputTypes: ["predictions"],
            confidence: 0.82,
          },
        ],
        config: {
          enabled: true,
          autoExecute: false,
          confidenceThreshold: 0.75,
          maxProcessingTime: 45,
          retryAttempts: 2,
          escalationRules: {
            lowConfidence: true,
            errors: true,
            timeout: false,
          },
          integrations: {
            email: true,
            slack: true,
            crm: false,
            hrms: false,
          },
        },
        triggers: ["project_update", "manual"],
        executionCount: 89,
        successRate: 0.91,
        averageProcessingTime: 15,
        createdAt: new Date("2024-02-01"),
        updatedAt: new Date(),
        lastExecuted: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      },
      {
        id: "agent-cost-predictor",
        name: "Cost Intelligence",
        type: "cost_predictor",
        description: "AI-driven cost estimation and budget optimization",
        status: "active",
        capabilities: [
          {
            id: "cost-estimation",
            name: "Cost Estimation",
            description: "Predict project costs with high accuracy",
            inputTypes: ["project_specs"],
            outputTypes: ["cost_breakdown"],
            confidence: 0.89,
          },
          {
            id: "budget-optimization",
            name: "Budget Optimization",
            description: "Suggest cost optimization strategies",
            inputTypes: ["budget_data"],
            outputTypes: ["recommendations"],
            confidence: 0.84,
          },
        ],
        config: {
          enabled: true,
          autoExecute: true,
          confidenceThreshold: 0.8,
          maxProcessingTime: 25,
          retryAttempts: 3,
          escalationRules: {
            lowConfidence: true,
            errors: true,
            timeout: true,
          },
          integrations: {
            email: false,
            slack: false,
            crm: true,
            hrms: false,
          },
        },
        triggers: ["project_update", "cost_threshold"],
        executionCount: 203,
        successRate: 0.88,
        averageProcessingTime: 12,
        createdAt: new Date("2024-01-20"),
        updatedAt: new Date(),
        lastExecuted: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      },
      {
        id: "agent-safety-monitor",
        name: "Safety Compliance Monitor",
        type: "safety_monitor",
        description: "Real-time safety monitoring and compliance checking",
        status: "active",
        capabilities: [
          {
            id: "compliance-check",
            name: "Compliance Check",
            description: "Monitor safety compliance in real-time",
            inputTypes: ["safety_data"],
            outputTypes: ["compliance_report"],
            confidence: 0.93,
          },
          {
            id: "incident-detection",
            name: "Incident Detection",
            description: "Detect potential safety incidents",
            inputTypes: ["sensor_data", "reports"],
            outputTypes: ["alerts"],
            confidence: 0.91,
          },
        ],
        config: {
          enabled: true,
          autoExecute: true,
          confidenceThreshold: 0.9,
          maxProcessingTime: 10,
          retryAttempts: 2,
          escalationRules: {
            lowConfidence: false,
            errors: true,
            timeout: true,
          },
          integrations: {
            email: true,
            slack: true,
            crm: false,
            hrms: true,
          },
        },
        triggers: ["safety_incident", "time_based"],
        executionCount: 456,
        successRate: 0.97,
        averageProcessingTime: 5,
        createdAt: new Date("2024-01-10"),
        updatedAt: new Date(),
        lastExecuted: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      },
      {
        id: "agent-smart-assistant",
        name: "BuildPro AI Assistant",
        type: "smart_assistant",
        description: "Conversational AI for ERP queries and assistance",
        status: "active",
        capabilities: [
          {
            id: "query-processing",
            name: "Query Processing",
            description: "Process natural language queries",
            inputTypes: ["text"],
            outputTypes: ["responses"],
            confidence: 0.86,
          },
          {
            id: "task-automation",
            name: "Task Automation",
            description: "Automate routine ERP tasks",
            inputTypes: ["commands"],
            outputTypes: ["actions"],
            confidence: 0.79,
          },
        ],
        config: {
          enabled: true,
          autoExecute: false,
          confidenceThreshold: 0.7,
          maxProcessingTime: 15,
          retryAttempts: 1,
          escalationRules: {
            lowConfidence: false,
            errors: false,
            timeout: false,
          },
          integrations: {
            email: false,
            slack: true,
            crm: true,
            hrms: true,
          },
        },
        triggers: ["manual", "api_call"],
        executionCount: 1247,
        successRate: 0.83,
        averageProcessingTime: 3,
        createdAt: new Date("2024-01-05"),
        updatedAt: new Date(),
        lastExecuted: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      },
    ];

    setAgents(sampleAgents);
  };

  const updateDashboardData = () => {
    const activeAgents = agents.filter((agent) => agent.status === "active");
    const totalExecutions = agents.reduce(
      (sum, agent) => sum + agent.executionCount,
      0,
    );
    const avgSuccessRate =
      agents.length > 0
        ? agents.reduce((sum, agent) => sum + agent.successRate, 0) /
          agents.length
        : 0;
    const avgProcessingTime =
      agents.length > 0
        ? agents.reduce((sum, agent) => sum + agent.averageProcessingTime, 0) /
          agents.length
        : 0;

    const dashboardData: AIAgentDashboard = {
      totalAgents: agents.length,
      activeAgents: activeAgents.length,
      totalExecutions,
      successRate: avgSuccessRate,
      averageProcessingTime: Math.round(avgProcessingTime),
      costSavings: 2450000, // ₹24.5L
      timesSaved: 1840, // hours
      criticalAlerts: 3,
      recentInsights: [],
      topPerformingAgents:
        agents && agents.length > 0
          ? agents.sort((a, b) => b.successRate - a.successRate).slice(0, 3)
          : [],
      upcomingTasks: [],
    };

    setDashboardData(dashboardData);
  };

  const handleAgentToggle = async (agentId: string, enabled: boolean) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === agentId
          ? {
              ...agent,
              status: enabled ? "active" : "inactive",
              config: { ...agent.config, enabled },
            }
          : agent,
      ),
    );

    toast({
      title: enabled ? "Agent Activated" : "Agent Deactivated",
      description: `AI Agent has been ${enabled ? "activated" : "deactivated"}.`,
    });
  };

  const handleAgentExecute = async (agentId: string) => {
    const agent = agents.find((a) => a.id === agentId);
    if (!agent) return;

    // Update status to processing
    setAgents((prev) =>
      prev.map((a) => (a.id === agentId ? { ...a, status: "processing" } : a)),
    );

    toast({
      title: "AI Agent Executing",
      description: `${agent.name} is now processing...`,
    });

    try {
      // Simulate different types of AI processing based on agent type
      let result: AIAgentResult;

      switch (agent.type) {
        case "document_processor":
          result = await engine.processDocument(agentId, "sample-document.pdf");
          break;
        case "risk_analyzer":
          result = await engine.analyzeProjectRisk(agentId, {
            id: "project-123",
            status: "in_progress",
          });
          break;
        case "cost_predictor":
          result = await engine.predictProjectCost(agentId, {
            type: "commercial",
            size: 50000,
          });
          break;
        case "safety_monitor":
          result = await engine.analyzeSafetyCompliance(agentId, {
            site: "site-001",
            date: new Date(),
          });
          break;
        case "smart_assistant":
          result = await engine.processNaturalLanguageQuery(
            agentId,
            "What is the status of my current projects?",
          );
          break;
        default:
          throw new Error("Unknown agent type");
      }

      // Store result for viewing
      setResults((prev) => ({
        ...prev,
        [agentId]: [result, ...(prev[agentId] || [])].slice(0, 10), // Keep last 10 results
      }));

      // Update agent status and stats
      setAgents((prev) =>
        prev.map((a) =>
          a.id === agentId
            ? {
                ...a,
                status: "active",
                lastExecuted: new Date(),
                executionCount: a.executionCount + 1,
                averageProcessingTime: Math.round(
                  (a.averageProcessingTime + result.processingTime / 1000) / 2,
                ),
              }
            : a,
        ),
      );

      toast({
        title: "Execution Completed",
        description: `${agent.name} completed successfully with ${Math.round(result.confidence * 100)}% confidence.`,
      });
    } catch (error) {
      // Update status to error
      setAgents((prev) =>
        prev.map((a) => (a.id === agentId ? { ...a, status: "error" } : a)),
      );

      toast({
        title: "Execution Failed",
        description: `${agent.name} execution failed. Please check configuration.`,
        variant: "destructive",
      });
    }
  };

  const handleAgentConfigure = useCallback(
    (agentId: string) => {
      const agent = agents.find((a) => a.id === agentId);
      if (agent) {
        setConfigureAgent(agent);
        setShowConfiguration(true);
      } else {
        toast({
          title: "Configuration Error",
          description: "Agent not found for configuration.",
        });
      }
    },
    [agents, toast],
  );

  const handleAgentResults = useCallback(
    (agentId: string) => {
      const agent = agents.find((a) => a.id === agentId);
      if (agent) {
        setSelectedAgent(agent);
        setShowResults(true);
      } else {
        toast({
          title: "No Results",
          description: "No execution results found for this agent.",
        });
      }
    },
    [agents, toast],
  );

  const handleConfigurationSave = useCallback(
    (agentId: string, newConfig: any) => {
      setAgents((prev) =>
        prev.map((agent) =>
          agent.id === agentId
            ? { ...agent, config: newConfig, updatedAt: new Date() }
            : agent,
        ),
      );

      toast({
        title: "Configuration Saved",
        description: "AI agent configuration has been updated successfully.",
      });
    },
    [toast],
  );

  const filteredAgents =
    agents && agents.length > 0
      ? agents.filter((agent) => {
          const matchesSearch =
            agent.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            agent.description?.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesStatus =
            statusFilter === "all" || agent.status === statusFilter;
          const matchesType = typeFilter === "all" || agent.type === typeFilter;
          return matchesSearch && matchesStatus && matchesType;
        })
      : [];

  return (
    <div className={cn("space-y-6", className)}>
      {/* Dashboard Overview */}
      {dashboardData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Agents</p>
                  <p className="text-2xl font-semibold">
                    {dashboardData.totalAgents}
                  </p>
                  <p className="text-xs text-green-600">
                    {dashboardData.activeAgents} active
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Executions</p>
                  <p className="text-2xl font-semibold">
                    {dashboardData.totalExecutions.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600">
                    {Math.round(dashboardData.successRate * 100)}% success rate
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Cost Savings</p>
                  <p className="text-2xl font-semibold">
                    ₹{(dashboardData.costSavings / 100000).toFixed(1)}L
                  </p>
                  <p className="text-xs text-green-600">
                    {dashboardData.timesSaved}h saved
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Critical Alerts
                  </p>
                  <p className="text-2xl font-semibold">
                    {dashboardData.criticalAlerts}
                  </p>
                  <p className="text-xs text-orange-600">Require attention</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>AI Agents</span>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Agent
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search agents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="document_processor">
                  Document Processor
                </SelectItem>
                <SelectItem value="risk_analyzer">Risk Analyzer</SelectItem>
                <SelectItem value="cost_predictor">Cost Predictor</SelectItem>
                <SelectItem value="safety_monitor">Safety Monitor</SelectItem>
                <SelectItem value="smart_assistant">Smart Assistant</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <AIAgentCard
                key={agent.id}
                agent={agent}
                execution={executions.find((e) => e.agentId === agent.id)}
                onToggle={handleAgentToggle}
                onExecute={handleAgentExecute}
                onConfigure={handleAgentConfigure}
                onViewResults={handleAgentResults}
              />
            ))}
          </div>

          {filteredAgents.length === 0 && (
            <div className="text-center py-12">
              <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No agents found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-1" />
                Create New Agent
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Modal */}
      {selectedAgent && showResults && (
        <AIAgentResults
          key={selectedAgent.id}
          open={showResults}
          onOpenChange={(open) => {
            setShowResults(open);
            if (!open) {
              setSelectedAgent(null);
            }
          }}
          agent={selectedAgent}
          results={results[selectedAgent.id] || []}
          executions={executions.filter((e) => e.agentId === selectedAgent.id)}
        />
      )}

      {/* Configuration Modal */}
      {configureAgent && showConfiguration && (
        <AIAgentConfiguration
          key={configureAgent.id}
          open={showConfiguration}
          onOpenChange={(open) => {
            setShowConfiguration(open);
            if (!open) {
              setConfigureAgent(null);
            }
          }}
          agent={configureAgent}
          onSave={handleConfigurationSave}
        />
      )}
    </div>
  );
}
