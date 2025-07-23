import React, { useState, useEffect } from "react";
import { AIAgent, AIAgentConfig } from "./types";
import { CustomModal } from "./CustomModal";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Switch } from "../../ui/switch";
// import { Slider } from "../../ui/slider"; // Using range input instead
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";
import {
  Settings,
  Brain,
  Zap,
  Clock,
  RotateCcw,
  Mail,
  MessageSquare,
  Users,
  Database,
  Save,
  RefreshCcw,
} from "lucide-react";

interface AIAgentConfigurationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agent: AIAgent;
  onSave: (agentId: string, config: AIAgentConfig) => void;
}

export function AIAgentConfiguration({
  open,
  onOpenChange,
  agent,
  onSave,
}: AIAgentConfigurationProps) {
  const [config, setConfig] = useState<AIAgentConfig>(agent.config);
  const [hasChanges, setHasChanges] = useState(false);

  // Reset config when agent changes
  useEffect(() => {
    setConfig(agent.config);
    setHasChanges(false);
  }, [agent.config, open]);

  const handleConfigChange = (key: keyof AIAgentConfig, value: any) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
    setHasChanges(true);
  };

  const handleNestedConfigChange = (
    parentKey: keyof AIAgentConfig,
    childKey: string,
    value: any,
  ) => {
    setConfig((prev) => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [childKey]: value,
      },
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave(agent.id, config);
    setHasChanges(false);
    onOpenChange(false);
  };

  const handleReset = () => {
    setConfig(agent.config);
    setHasChanges(false);
  };

  const modelOptions = [
    { label: "GPT-4 Turbo", value: "gpt-4-turbo" },
    { label: "GPT-4", value: "gpt-4" },
    { label: "GPT-3.5 Turbo", value: "gpt-3.5-turbo" },
    { label: "Claude-3 Sonnet", value: "claude-3-sonnet" },
    { label: "Claude-3 Haiku", value: "claude-3-haiku" },
    { label: "Local Model", value: "local" },
  ];

  return (
    <CustomModal
      open={open}
      onOpenChange={onOpenChange}
      title={`Configure ${agent.name}`}
      description="Adjust AI agent settings and behavior"
      className="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Basic Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Basic Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="enabled">Agent Status</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enabled"
                    checked={config.enabled}
                    onCheckedChange={(checked) =>
                      handleConfigChange("enabled", checked)
                    }
                  />
                  <span className="text-sm">
                    {config.enabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="autoExecute">Auto-Execute</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="autoExecute"
                    checked={config.autoExecute}
                    onCheckedChange={(checked) =>
                      handleConfigChange("autoExecute", checked)
                    }
                  />
                  <span className="text-sm">
                    {config.autoExecute ? "On" : "Off"}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confidenceThreshold">
                Confidence Threshold:{" "}
                {Math.round(config.confidenceThreshold * 100)}%
              </Label>
              <input
                id="confidenceThreshold"
                type="range"
                min={0.1}
                max={1.0}
                step={0.05}
                value={config.confidenceThreshold}
                onChange={(e) =>
                  handleConfigChange(
                    "confidenceThreshold",
                    Number(e.target.value),
                  )
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-xs text-muted-foreground">
                Minimum confidence required for automatic actions
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxProcessingTime">
                  Max Processing Time (seconds)
                </Label>
                <Input
                  id="maxProcessingTime"
                  type="number"
                  value={config.maxProcessingTime}
                  onChange={(e) =>
                    handleConfigChange(
                      "maxProcessingTime",
                      Number(e.target.value),
                    )
                  }
                  min={1}
                  max={300}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="retryAttempts">Retry Attempts</Label>
                <Input
                  id="retryAttempts"
                  type="number"
                  value={config.retryAttempts}
                  onChange={(e) =>
                    handleConfigChange("retryAttempts", Number(e.target.value))
                  }
                  min={0}
                  max={10}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Model Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5" />
              <span>AI Model Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="model">AI Model</Label>
              <Select
                value={config.modelSettings?.model || "gpt-4-turbo"}
                onValueChange={(value) =>
                  handleNestedConfigChange("modelSettings", "model", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select AI model" />
                </SelectTrigger>
                <SelectContent>
                  {modelOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="temperature">
                  Temperature: {config.modelSettings?.temperature || 0.7}
                </Label>
                <input
                  id="temperature"
                  type="range"
                  min={0}
                  max={2}
                  step={0.1}
                  value={config.modelSettings?.temperature || 0.7}
                  onChange={(e) =>
                    handleNestedConfigChange(
                      "modelSettings",
                      "temperature",
                      Number(e.target.value),
                    )
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-xs text-muted-foreground">
                  Controls response creativity (0 = focused, 2 = creative)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxTokens">Max Tokens</Label>
                <Input
                  id="maxTokens"
                  type="number"
                  value={config.modelSettings?.maxTokens || 4000}
                  onChange={(e) =>
                    handleNestedConfigChange(
                      "modelSettings",
                      "maxTokens",
                      Number(e.target.value),
                    )
                  }
                  min={100}
                  max={8000}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customPrompts">Custom Prompts</Label>
              <Textarea
                id="customPrompts"
                placeholder="Enter custom prompts or instructions for the AI agent..."
                value={config.customPrompts?.join("\n") || ""}
                onChange={(e) =>
                  handleConfigChange(
                    "customPrompts",
                    e.target.value.split("\n").filter(Boolean),
                  )
                }
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Escalation Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>Escalation Rules</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={config.escalationRules.lowConfidence}
                  onCheckedChange={(checked) =>
                    handleNestedConfigChange(
                      "escalationRules",
                      "lowConfidence",
                      checked,
                    )
                  }
                />
                <Label className="text-sm">Low Confidence</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={config.escalationRules.errors}
                  onCheckedChange={(checked) =>
                    handleNestedConfigChange(
                      "escalationRules",
                      "errors",
                      checked,
                    )
                  }
                />
                <Label className="text-sm">Errors</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={config.escalationRules.timeout}
                  onCheckedChange={(checked) =>
                    handleNestedConfigChange(
                      "escalationRules",
                      "timeout",
                      checked,
                    )
                  }
                />
                <Label className="text-sm">Timeout</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integration Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Integrations</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <Label>Email Notifications</Label>
                </div>
                <Switch
                  checked={config.integrations.email}
                  onCheckedChange={(checked) =>
                    handleNestedConfigChange("integrations", "email", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4" />
                  <Label>Slack</Label>
                </div>
                <Switch
                  checked={config.integrations.slack}
                  onCheckedChange={(checked) =>
                    handleNestedConfigChange("integrations", "slack", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <Label>CRM Integration</Label>
                </div>
                <Switch
                  checked={config.integrations.crm}
                  onCheckedChange={(checked) =>
                    handleNestedConfigChange("integrations", "crm", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Database className="h-4 w-4" />
                  <Label>HRMS Integration</Label>
                </div>
                <Switch
                  checked={config.integrations.hrms}
                  onCheckedChange={(checked) =>
                    handleNestedConfigChange("integrations", "hrms", checked)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {hasChanges && (
              <Badge
                variant="secondary"
                className="bg-yellow-100 text-yellow-800"
              >
                Unsaved Changes
              </Badge>
            )}
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handleReset}
              disabled={!hasChanges}
            >
              <RefreshCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!hasChanges}>
              <Save className="h-4 w-4 mr-1" />
              Save Configuration
            </Button>
          </div>
        </div>
      </div>
    </CustomModal>
  );
}
