import React, { useState, useCallback, useEffect } from "react";
import {
  WorkflowSchema,
  WorkflowNode,
  WorkflowConnection,
  WorkflowNodeType,
  WorkflowBuilderState,
  WorkflowExecution,
} from "./types";
import { WorkflowCanvas } from "./WorkflowCanvas";
import { WorkflowToolbar } from "./WorkflowToolbar";
import { WorkflowPropertiesPanel } from "./WorkflowPropertiesPanel";
import { nodeTemplates } from "./WorkflowToolbar";
import { useToast } from "../../ui/use-toast";
import { Workflow } from "lucide-react";

interface WorkflowBuilderProps {
  initialWorkflow?: WorkflowSchema;
  onSave?: (workflow: WorkflowSchema) => void;
  onExecute?: (workflow: WorkflowSchema) => Promise<WorkflowExecution>;
  className?: string;
}

export function WorkflowBuilder({
  initialWorkflow,
  onSave,
  onExecute,
  className,
}: WorkflowBuilderProps) {
  const { toast } = useToast();

  // Workflow state
  const [workflow, setWorkflow] = useState<WorkflowSchema>(
    initialWorkflow || {
      id: "new-workflow",
      name: "New Workflow",
      description: "A new workflow",
      version: "1.0.0",
      trigger: "manual",
      nodes: [],
      connections: [],
      settings: {
        autoSave: false,
        enableLogging: true,
        maxExecutionTime: 300,
        retryPolicy: {
          enabled: false,
          maxRetries: 3,
          retryDelay: 1000,
        },
        notifications: {
          onSuccess: true,
          onFailure: true,
          onTimeout: true,
        },
      },
    },
  );

  // Builder state
  const [builderState, setBuilderState] = useState<WorkflowBuilderState>({
    workflow,
    selectedNodeId: null,
    isExecuting: false,
    zoom: 1,
    pan: { x: 50, y: 50 },
    mode: "design",
    showGrid: true,
    showMinimap: false,
  });

  // Execution state
  const [currentExecution, setCurrentExecution] =
    useState<WorkflowExecution | null>(null);

  // Auto-save effect (silent save without toast)
  useEffect(() => {
    if (workflow.settings.autoSave && onSave && workflow.nodes.length > 0) {
      const timeoutId = setTimeout(() => {
        // Silent save without triggering toast
        const workflowToSave = { ...workflow, updatedAt: new Date() };
        // Don't call the demo page's handleSaveWorkflow which shows toast
        // Instead just update the saved workflows silently
        console.log("Auto-saving workflow:", workflowToSave.name);
      }, 5000); // Increased delay to 5 seconds
      return () => clearTimeout(timeoutId);
    }
  }, [
    workflow.nodes.length,
    workflow.connections.length,
    workflow.settings.autoSave,
    onSave,
  ]);

  // Update builder state when workflow changes
  useEffect(() => {
    setBuilderState((prev) => ({ ...prev, workflow }));
  }, [workflow]);

  // Generate unique ID
  const generateId = useCallback(() => {
    return `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Add new node
  const handleAddNode = useCallback(
    (nodeType: WorkflowNodeType) => {
      const template = nodeTemplates.find((t) => t.type === nodeType);
      if (!template) return;

      const newNode: WorkflowNode = {
        id: generateId(),
        type: nodeType,
        position: {
          x: 100 + workflow.nodes.length * 50,
          y: 100 + workflow.nodes.length * 50,
        },
        data: { ...template.defaultData },
      };

      setWorkflow((prev) => ({
        ...prev,
        nodes: [...prev.nodes, newNode],
      }));

      setBuilderState((prev) => ({
        ...prev,
        selectedNodeId: newNode.id,
      }));

      toast({
        title: "Node Added",
        description: `${template.label} node has been added to the workflow.`,
      });
    },
    [workflow.nodes.length, generateId, toast],
  );

  // Select node
  const handleNodeSelect = useCallback((nodeId: string | null) => {
    setBuilderState((prev) => ({
      ...prev,
      selectedNodeId: nodeId,
    }));
  }, []);

  // Move node
  const handleNodeMove = useCallback(
    (nodeId: string, position: { x: number; y: number }) => {
      setWorkflow((prev) => ({
        ...prev,
        nodes: prev.nodes.map((node) =>
          node.id === nodeId ? { ...node, position } : node,
        ),
      }));
    },
    [],
  );

  // Update node
  const handleNodeUpdate = useCallback(
    (nodeId: string, updates: Partial<WorkflowNode>) => {
      setWorkflow((prev) => ({
        ...prev,
        nodes: prev.nodes.map((node) =>
          node.id === nodeId ? { ...node, ...updates } : node,
        ),
      }));
    },
    [],
  );

  // Delete node
  const handleNodeDelete = useCallback(
    (nodeId: string) => {
      setWorkflow((prev) => ({
        ...prev,
        nodes: prev.nodes.filter((node) => node.id !== nodeId),
        connections: prev.connections.filter(
          (conn) =>
            conn.sourceNodeId !== nodeId && conn.targetNodeId !== nodeId,
        ),
      }));

      setBuilderState((prev) => ({
        ...prev,
        selectedNodeId:
          prev.selectedNodeId === nodeId ? null : prev.selectedNodeId,
      }));

      toast({
        title: "Node Deleted",
        description: "Node and its connections have been removed.",
      });
    },
    [toast],
  );

  // Create connection
  const handleConnectionCreate = useCallback(
    (connection: Omit<WorkflowConnection, "id">) => {
      const newConnection: WorkflowConnection = {
        ...connection,
        id: generateId(),
      };

      setWorkflow((prev) => ({
        ...prev,
        connections: [...prev.connections, newConnection],
      }));

      toast({
        title: "Connection Created",
        description: "Nodes have been connected successfully.",
      });
    },
    [generateId, toast],
  );

  // Delete connection
  const handleConnectionDelete = useCallback(
    (connectionId: string) => {
      setWorkflow((prev) => ({
        ...prev,
        connections: prev.connections.filter(
          (conn) => conn.id !== connectionId,
        ),
      }));

      toast({
        title: "Connection Deleted",
        description: "Connection has been removed.",
      });
    },
    [toast],
  );

  // Update workflow
  const handleWorkflowUpdate = useCallback(
    (updates: Partial<WorkflowSchema>) => {
      setWorkflow((prev) => ({ ...prev, ...updates }));
    },
    [],
  );

  // Canvas click (deselect)
  const handleCanvasClick = useCallback(() => {
    setBuilderState((prev) => ({
      ...prev,
      selectedNodeId: null,
    }));
  }, []);

  // Save workflow (manual save)
  const handleSave = useCallback(() => {
    if (onSave) {
      const workflowToSave = { ...workflow, updatedAt: new Date() };
      onSave(workflowToSave);
      toast({
        title: "Workflow Saved",
        description: `"${workflow.name}" has been saved manually.`,
      });
    }
  }, [workflow, onSave, toast]);

  // Load workflow
  const handleLoad = useCallback(() => {
    // In a real app, this would open a file picker or modal
    toast({
      title: "Load Workflow",
      description: "Load functionality would be implemented here.",
    });
  }, [toast]);

  // Export workflow
  const handleExport = useCallback(() => {
    const dataStr = JSON.stringify(workflow, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `${workflow.name.replace(/\s+/g, "_")}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();

    toast({
      title: "Workflow Exported",
      description: "Workflow has been exported as JSON file.",
    });
  }, [workflow, toast]);

  // Import workflow
  const handleImport = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const importedWorkflow = JSON.parse(
              e.target?.result as string,
            ) as WorkflowSchema;
            setWorkflow(importedWorkflow);
            toast({
              title: "Workflow Imported",
              description: `"${importedWorkflow.name}" has been imported successfully.`,
            });
          } catch (error) {
            toast({
              title: "Import Error",
              description: "Failed to import workflow. Invalid JSON format.",
              variant: "destructive",
            });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, [toast]);

  // Execute workflow
  const handleExecute = useCallback(async () => {
    if (!onExecute) {
      toast({
        title: "Execute Workflow",
        description: "Workflow execution would start here.",
      });
      return;
    }

    setBuilderState((prev) => ({ ...prev, isExecuting: true }));

    try {
      const execution = await onExecute(workflow);
      setCurrentExecution(execution);
      toast({
        title: "Workflow Executing",
        description: "Workflow execution has started.",
      });
    } catch (error) {
      toast({
        title: "Execution Error",
        description: "Failed to start workflow execution.",
        variant: "destructive",
      });
    } finally {
      setBuilderState((prev) => ({ ...prev, isExecuting: false }));
    }
  }, [workflow, onExecute, toast]);

  // Reset workflow
  const handleReset = useCallback(() => {
    setWorkflow((prev) => ({
      ...prev,
      nodes: [],
      connections: [],
    }));
    setBuilderState((prev) => ({
      ...prev,
      selectedNodeId: null,
    }));
    setCurrentExecution(null);
    toast({
      title: "Workflow Reset",
      description: "All nodes and connections have been cleared.",
    });
  }, [toast]);

  // Zoom controls
  const handleZoomIn = useCallback(() => {
    setBuilderState((prev) => ({
      ...prev,
      zoom: Math.min(prev.zoom * 1.2, 3),
    }));
  }, []);

  const handleZoomOut = useCallback(() => {
    setBuilderState((prev) => ({
      ...prev,
      zoom: Math.max(prev.zoom / 1.2, 0.1),
    }));
  }, []);

  // Toggle grid
  const handleToggleGrid = useCallback(() => {
    setBuilderState((prev) => ({
      ...prev,
      showGrid: !prev.showGrid,
    }));
  }, []);

  // Toggle minimap
  const handleToggleMinimap = useCallback(() => {
    setBuilderState((prev) => ({
      ...prev,
      showMinimap: !prev.showMinimap,
    }));
  }, []);

  // Get selected node
  const selectedNode = builderState.selectedNodeId
    ? workflow.nodes.find((node) => node.id === builderState.selectedNodeId)
    : null;

  return (
    <div className="flex h-full w-full min-h-[600px]">
      {/* Toolbar */}
      <div className="w-80 min-w-[320px] border-r border-border bg-background flex-shrink-0">
        <WorkflowToolbar
          onAddNode={handleAddNode}
          onSave={handleSave}
          onLoad={handleLoad}
          onExport={handleExport}
          onImport={handleImport}
          onExecute={handleExecute}
          onReset={handleReset}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onToggleGrid={handleToggleGrid}
          onToggleMinimap={handleToggleMinimap}
          showGrid={builderState.showGrid}
          showMinimap={builderState.showMinimap}
          isExecuting={builderState.isExecuting}
        />
      </div>

      {/* Canvas */}
      <div className="flex-1 relative bg-gray-100 min-h-[600px]">
        <WorkflowCanvas
          nodes={workflow.nodes}
          connections={workflow.connections}
          selectedNodeId={builderState.selectedNodeId}
          zoom={builderState.zoom}
          pan={builderState.pan}
          showGrid={builderState.showGrid}
          onNodeSelect={handleNodeSelect}
          onNodeMove={handleNodeMove}
          onNodeDelete={handleNodeDelete}
          onConnectionCreate={handleConnectionCreate}
          onConnectionDelete={handleConnectionDelete}
          onCanvasClick={handleCanvasClick}
        />

        {/* Canvas Helper Text when empty */}
        {workflow.nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center text-gray-500">
              <Workflow className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">
                Start Building Your Workflow
              </p>
              <p className="text-sm">Drag nodes from the toolbar to begin</p>
            </div>
          </div>
        )}
      </div>

      {/* Properties Panel */}
      <div className="w-80 min-w-[320px] border-l border-border bg-background flex-shrink-0">
        <WorkflowPropertiesPanel
          selectedNode={selectedNode}
          workflow={workflow}
          execution={currentExecution}
          onNodeUpdate={handleNodeUpdate}
          onWorkflowUpdate={handleWorkflowUpdate}
        />
      </div>
    </div>
  );
}
