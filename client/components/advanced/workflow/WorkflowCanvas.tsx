import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  WorkflowNode as WorkflowNodeType,
  WorkflowConnection,
  WorkflowBuilderState,
} from "./types";
import { WorkflowNode } from "./WorkflowNode";
import { cn } from "../../../lib/utils";

interface WorkflowCanvasProps {
  nodes: WorkflowNodeType[];
  connections: WorkflowConnection[];
  selectedNodeId?: string | null;
  zoom?: number;
  pan?: { x: number; y: number };
  showGrid?: boolean;
  onNodeSelect?: (nodeId: string | null) => void;
  onNodeMove?: (nodeId: string, position: { x: number; y: number }) => void;
  onNodeDelete?: (nodeId: string) => void;
  onConnectionCreate?: (connection: Omit<WorkflowConnection, "id">) => void;
  onConnectionDelete?: (connectionId: string) => void;
  onCanvasClick?: () => void;
  className?: string;
}

interface DragState {
  isDragging: boolean;
  nodeId: string | null;
  offset: { x: number; y: number };
  startPosition: { x: number; y: number };
}

interface ConnectionState {
  isConnecting: boolean;
  sourceNodeId: string | null;
  sourceHandle: string | null;
  mousePosition: { x: number; y: number };
}

export function WorkflowCanvas({
  nodes,
  connections,
  selectedNodeId,
  zoom = 1,
  pan = { x: 0, y: 0 },
  showGrid = false,
  onNodeSelect,
  onNodeMove,
  onNodeDelete,
  onConnectionCreate,
  onConnectionDelete,
  onCanvasClick,
  className,
}: WorkflowCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    nodeId: null,
    offset: { x: 0, y: 0 },
    startPosition: { x: 0, y: 0 },
  });
  const [connectionState, setConnectionState] = useState<ConnectionState>({
    isConnecting: false,
    sourceNodeId: null,
    sourceHandle: null,
    mousePosition: { x: 0, y: 0 },
  });

  // Convert screen coordinates to canvas coordinates
  const screenToCanvas = useCallback(
    (screenX: number, screenY: number) => {
      if (!canvasRef.current) return { x: screenX, y: screenY };
      const rect = canvasRef.current.getBoundingClientRect();
      return {
        x: (screenX - rect.left - pan.x) / zoom,
        y: (screenY - rect.top - pan.y) / zoom,
      };
    },
    [zoom, pan],
  );

  // Handle mouse down on node (start dragging)
  const handleNodeMouseDown = useCallback(
    (e: React.MouseEvent, nodeId: string) => {
      e.stopPropagation();
      const canvasPos = screenToCanvas(e.clientX, e.clientY);
      const node = nodes.find((n) => n.id === nodeId);
      if (!node) return;

      setDragState({
        isDragging: true,
        nodeId,
        offset: {
          x: canvasPos.x - node.position.x,
          y: canvasPos.y - node.position.y,
        },
        startPosition: node.position,
      });

      onNodeSelect?.(nodeId);
    },
    [nodes, screenToCanvas, onNodeSelect],
  );

  // Handle mouse move
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const canvasPos = screenToCanvas(e.clientX, e.clientY);

      // Update connection state for visual feedback
      if (connectionState.isConnecting) {
        setConnectionState((prev) => ({
          ...prev,
          mousePosition: canvasPos,
        }));
      }

      // Handle node dragging
      if (dragState.isDragging && dragState.nodeId) {
        const newPosition = {
          x: canvasPos.x - dragState.offset.x,
          y: canvasPos.y - dragState.offset.y,
        };
        onNodeMove?.(dragState.nodeId, newPosition);
      }
    },
    [dragState, connectionState.isConnecting, screenToCanvas, onNodeMove],
  );

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    setDragState({
      isDragging: false,
      nodeId: null,
      offset: { x: 0, y: 0 },
      startPosition: { x: 0, y: 0 },
    });
  }, []);

  // Handle connection creation
  const handleNodeConnect = useCallback(
    (nodeId: string, handleType: "source" | "target") => {
      if (handleType === "source") {
        // Start connection
        setConnectionState({
          isConnecting: true,
          sourceNodeId: nodeId,
          sourceHandle: "output",
          mousePosition: { x: 0, y: 0 },
        });
      } else if (connectionState.isConnecting && connectionState.sourceNodeId) {
        // Complete connection
        if (connectionState.sourceNodeId !== nodeId) {
          onConnectionCreate?.({
            sourceNodeId: connectionState.sourceNodeId,
            targetNodeId: nodeId,
            sourceHandle: connectionState.sourceHandle || "output",
            targetHandle: "input",
          });
        }
        setConnectionState({
          isConnecting: false,
          sourceNodeId: null,
          sourceHandle: null,
          mousePosition: { x: 0, y: 0 },
        });
      }
    },
    [connectionState, onConnectionCreate],
  );

  // Handle canvas click
  const handleCanvasClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onCanvasClick?.();
        setConnectionState({
          isConnecting: false,
          sourceNodeId: null,
          sourceHandle: null,
          mousePosition: { x: 0, y: 0 },
        });
      }
    },
    [onCanvasClick],
  );

  // Add event listeners
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Handle key press for deleting nodes
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (selectedNodeId) {
          onNodeDelete?.(selectedNodeId);
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [selectedNodeId, onNodeDelete]);

  // Render connection line
  const renderConnection = (connection: WorkflowConnection) => {
    const sourceNode = nodes.find((n) => n.id === connection.sourceNodeId);
    const targetNode = nodes.find((n) => n.id === connection.targetNodeId);
    if (!sourceNode || !targetNode) return null;

    const sourcePos = {
      x: sourceNode.position.x + 192, // Node width
      y: sourceNode.position.y + 40, // Half node height
    };
    const targetPos = {
      x: targetNode.position.x,
      y: targetNode.position.y + 40,
    };

    // Create curved path
    const midX = (sourcePos.x + targetPos.x) / 2;
    const path = `M ${sourcePos.x} ${sourcePos.y} Q ${midX} ${sourcePos.y} ${midX} ${(sourcePos.y + targetPos.y) / 2} Q ${midX} ${targetPos.y} ${targetPos.x} ${targetPos.y}`;

    return (
      <g key={connection.id}>
        <path
          d={path}
          stroke="#94a3b8"
          strokeWidth="2"
          fill="none"
          className="hover:stroke-blue-500 cursor-pointer transition-colors"
          onClick={() => onConnectionDelete?.(connection.id)}
        />
        <circle
          cx={sourcePos.x}
          cy={sourcePos.y}
          r="4"
          fill="#94a3b8"
          className="pointer-events-none"
        />
        <circle
          cx={targetPos.x}
          cy={targetPos.y}
          r="4"
          fill="#94a3b8"
          className="pointer-events-none"
        />
        {connection.label && (
          <text
            x={midX}
            y={(sourcePos.y + targetPos.y) / 2 - 10}
            textAnchor="middle"
            className="text-xs fill-gray-600 pointer-events-none"
          >
            {connection.label}
          </text>
        )}
      </g>
    );
  };

  // Render temporary connection line while connecting
  const renderTempConnection = () => {
    if (!connectionState.isConnecting || !connectionState.sourceNodeId)
      return null;

    const sourceNode = nodes.find((n) => n.id === connectionState.sourceNodeId);
    if (!sourceNode) return null;

    const sourcePos = {
      x: sourceNode.position.x + 192,
      y: sourceNode.position.y + 40,
    };
    const targetPos = connectionState.mousePosition;

    return (
      <line
        x1={sourcePos.x}
        y1={sourcePos.y}
        x2={targetPos.x}
        y2={targetPos.y}
        stroke="#3b82f6"
        strokeWidth="2"
        strokeDasharray="5,5"
        className="pointer-events-none"
      />
    );
  };

  return (
    <div
      ref={canvasRef}
      className={cn(
        "relative w-full h-full overflow-hidden bg-white cursor-default min-h-[600px] border border-gray-200",
        className,
      )}
      onClick={handleCanvasClick}
      style={{
        transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
        transformOrigin: "0 0",
      }}
    >
      {/* Canvas Grid Dots (when showGrid is true) */}
      {showGrid && (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, #94a3b8 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
            zIndex: 0,
          }}
        />
      )}

      {/* SVG for connections */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      >
        {connections.map(renderConnection)}
        {renderTempConnection()}
      </svg>

      {/* Nodes */}
      <div className="relative" style={{ zIndex: 2 }}>
        {nodes.map((node) => (
          <WorkflowNode
            key={node.id}
            node={node}
            selected={selectedNodeId === node.id}
            onSelect={onNodeSelect}
            onConnect={handleNodeConnect}
            onMouseDown={handleNodeMouseDown}
            className="pointer-events-auto"
          />
        ))}
      </div>

      {/* Canvas overlay for drag operations */}
      {(dragState.isDragging || connectionState.isConnecting) && (
        <div
          className="absolute inset-0 cursor-pointer"
          style={{ zIndex: 3 }}
        />
      )}
    </div>
  );
}
