import React from "react";
import {
  WorkflowNode as WorkflowNodeType,
  WorkflowNodeType as NodeType,
} from "./types";
import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import {
  Play,
  Settings,
  GitBranch,
  CheckCircle,
  Bell,
  Clock,
  Database,
  Link,
  Square,
  Circle,
  Diamond,
  Zap,
  Mail,
  FileText,
  Users,
} from "lucide-react";
import { cn } from "../../../lib/utils";

interface WorkflowNodeProps {
  node: WorkflowNodeType;
  selected?: boolean;
  onSelect?: (nodeId: string) => void;
  onDelete?: (nodeId: string) => void;
  onDuplicate?: (nodeId: string) => void;
  onConnect?: (nodeId: string, handleType: "source" | "target") => void;
  onMouseDown?: (e: React.MouseEvent, nodeId: string) => void;
  className?: string;
}

const nodeIcons: Record<NodeType, React.ReactNode> = {
  start: <Play className="h-4 w-4" />,
  action: <Zap className="h-4 w-4" />,
  condition: <GitBranch className="h-4 w-4" />,
  approval: <Users className="h-4 w-4" />,
  notification: <Bell className="h-4 w-4" />,
  delay: <Clock className="h-4 w-4" />,
  data: <Database className="h-4 w-4" />,
  integration: <Link className="h-4 w-4" />,
  end: <CheckCircle className="h-4 w-4" />,
};

const nodeColors: Record<NodeType, string> = {
  start: "bg-green-100 border-green-300 text-green-800",
  action: "bg-blue-100 border-blue-300 text-blue-800",
  condition: "bg-yellow-100 border-yellow-300 text-yellow-800",
  approval: "bg-purple-100 border-purple-300 text-purple-800",
  notification: "bg-orange-100 border-orange-300 text-orange-800",
  delay: "bg-gray-100 border-gray-300 text-gray-800",
  data: "bg-cyan-100 border-cyan-300 text-cyan-800",
  integration: "bg-indigo-100 border-indigo-300 text-indigo-800",
  end: "bg-red-100 border-red-300 text-red-800",
};

const nodeShapes: Record<NodeType, string> = {
  start: "rounded-full",
  action: "rounded-lg",
  condition: "transform rotate-45",
  approval: "rounded-lg",
  notification: "rounded-lg",
  delay: "rounded-lg",
  data: "rounded-lg",
  integration: "rounded-lg",
  end: "rounded-full",
};

export function WorkflowNode({
  node,
  selected = false,
  onSelect,
  onDelete,
  onDuplicate,
  onConnect,
  onMouseDown,
  className,
}: WorkflowNodeProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect?.(node.id);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    // This will be handled by the canvas component
  };

  const handleConnectSource = (e: React.MouseEvent) => {
    e.stopPropagation();
    onConnect?.(node.id, "source");
  };

  const handleConnectTarget = (e: React.MouseEvent) => {
    e.stopPropagation();
    onConnect?.(node.id, "target");
  };

  const isConditionalNode =
    node.type === "condition" || node.type === "approval";

  return (
    <div
      className={cn("absolute select-none cursor-pointer group", className)}
      style={{
        left: node.position.x,
        top: node.position.y,
        transform: node.dragging ? "scale(1.05)" : "scale(1)",
        transition: node.dragging ? "none" : "transform 0.2s ease",
      }}
      onClick={handleClick}
      onMouseDown={(e) => onMouseDown?.(e, node.id)}
    >
      {/* Connection handles */}
      {node.type !== "start" && (
        <div
          className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-gray-300 rounded-full cursor-pointer hover:border-blue-500 transition-colors"
          onClick={handleConnectTarget}
          title="Connect input"
        />
      )}

      {node.type !== "end" && (
        <div
          className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-gray-300 rounded-full cursor-pointer hover:border-blue-500 transition-colors"
          onClick={handleConnectSource}
          title="Connect output"
        />
      )}

      {/* Conditional node additional handles */}
      {isConditionalNode && (
        <>
          <div
            className="absolute -right-2 top-1/4 transform -translate-y-1/2 w-3 h-3 bg-green-500 border border-white rounded-full cursor-pointer hover:bg-green-600 transition-colors"
            onClick={handleConnectSource}
            title="Yes/Approved"
          />
          <div
            className="absolute -right-2 bottom-1/4 transform translate-y-1/2 w-3 h-3 bg-red-500 border border-white rounded-full cursor-pointer hover:bg-red-600 transition-colors"
            onClick={handleConnectSource}
            title="No/Rejected"
          />
        </>
      )}

      {/* Node content */}
      <Card
        className={cn(
          "w-48 min-h-[80px] transition-all duration-200",
          nodeColors[node.type],
          selected && "ring-2 ring-blue-500 ring-offset-2",
          "hover:shadow-md group-hover:shadow-lg",
          node.type === "condition" && "relative",
        )}
      >
        <CardContent className="p-3">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              {nodeIcons[node.type]}
              <Badge variant="secondary" className="text-xs">
                {node.type}
              </Badge>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 hover:bg-white/50"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle settings
                }}
              >
                <Settings className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="font-medium text-sm leading-tight">
              {node.data.label}
            </h4>
            {node.data.description && (
              <p className="text-xs opacity-75 leading-tight">
                {node.data.description}
              </p>
            )}
          </div>

          {/* Status indicators */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex space-x-1">
              {node.data.config.status === "configured" && (
                <Circle className="h-3 w-3 fill-green-500 text-green-500" />
              )}
              {node.data.config.hasError && (
                <Circle className="h-3 w-3 fill-red-500 text-red-500" />
              )}
            </div>
            <div className="text-xs opacity-50">
              {node.data.inputs?.length || 0} → {node.data.outputs?.length || 0}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conditional node diamond overlay for condition type */}
      {node.type === "condition" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Diamond className="h-6 w-6 text-yellow-600 opacity-20" />
        </div>
      )}
    </div>
  );
}
