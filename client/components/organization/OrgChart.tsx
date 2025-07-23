import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AnimatedIcon } from "@/components/ui/animated-icons";
import {
  Users,
  ChevronDown,
  ChevronUp,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Settings,
  Eye,
  MapPin,
  Mail,
  Phone,
  Calendar,
  User,
  Building,
  MoreHorizontal,
} from "lucide-react";
import { OrgChartNode, OrgChartConfig } from "./types";

interface OrgChartProps {
  data: OrgChartNode[];
  config: OrgChartConfig;
  onNodeClick?: (node: OrgChartNode) => void;
  onConfigChange?: (config: OrgChartConfig) => void;
  className?: string;
}

interface OrgNodeProps {
  node: OrgChartNode;
  level: number;
  isExpanded: boolean;
  onToggle: (nodeId: string) => void;
  onNodeClick?: (node: OrgChartNode) => void;
  config: OrgChartConfig;
}

const OrgNode = ({
  node,
  level,
  isExpanded,
  onToggle,
  onNodeClick,
  config,
}: OrgNodeProps) => {
  const hasChildren = node.directReports && node.directReports.length > 0;
  const showChildren = isExpanded && hasChildren && level < config.expandLevel;

  const getNodeSizeClasses = () => {
    switch (config.nodeSize) {
      case "small":
        return "w-48 h-20";
      case "large":
        return "w-80 h-32";
      default:
        return "w-64 h-24";
    }
  };

  const getColorByScheme = () => {
    switch (config.colorScheme) {
      case "department":
        return "border-l-blue-500 bg-blue-50/50";
      case "level":
        const levelColors = [
          "border-l-purple-500 bg-purple-50/50",
          "border-l-blue-500 bg-blue-50/50",
          "border-l-green-500 bg-green-50/50",
          "border-l-yellow-500 bg-yellow-50/50",
        ];
        return levelColors[level % levelColors.length];
      case "location":
        return "border-l-emerald-500 bg-emerald-50/50";
      default:
        return "border-l-gray-500 bg-gray-50/50";
    }
  };

  return (
    <div className="flex flex-col items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card
              className={`${getNodeSizeClasses()} ${getColorByScheme()} border-l-4 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 relative overflow-hidden group`}
              onClick={() => onNodeClick?.(node)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-3 h-full flex items-center gap-3 relative z-10">
                {config.showPhotos && (
                  <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                    <AvatarImage src={node.avatar} alt={node.name} />
                    <AvatarFallback className="text-xs font-medium">
                      {node.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm truncate">
                      {node.name}
                    </h4>
                    {hasChildren && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggle(node.id);
                        }}
                        className="h-6 w-6 p-0 hover:bg-white/80"
                      >
                        <AnimatedIcon
                          icon={isExpanded ? ChevronUp : ChevronDown}
                          size="sm"
                          className="text-gray-500"
                        />
                      </Button>
                    )}
                  </div>

                  <p className="text-xs text-gray-600 truncate">
                    {node.position}
                  </p>

                  {config.showDetails && (
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs px-1 py-0">
                        {node.department}
                      </Badge>
                      {node.directReports.length > 0 && (
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          <Users className="h-3 w-3 mr-1" />
                          {node.directReports.length}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Meeting
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-sm">
            <div className="space-y-2">
              <div className="font-semibold">{node.name}</div>
              <div className="text-sm">{node.position}</div>
              <div className="text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Building className="h-3 w-3" />
                  {node.department} • {node.location}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Mail className="h-3 w-3" />
                  {node.email}
                </div>
                {node.directReports.length > 0 && (
                  <div className="flex items-center gap-1 mt-1">
                    <Users className="h-3 w-3" />
                    {node.directReports.length} direct reports
                  </div>
                )}
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Connection Lines */}
      {showChildren && (
        <>
          <div className="w-px h-6 bg-gray-300"></div>
          <div className="flex items-center">
            <div className="h-px bg-gray-300 flex-1"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>
          <div className="w-px h-6 bg-gray-300"></div>
        </>
      )}

      {/* Children */}
      {showChildren && (
        <div
          className={`flex gap-8 ${config.orientation === "horizontal" ? "flex-col" : "flex-row"}`}
        >
          {node.directReports.map((child, index) => (
            <div key={child.id} className="relative">
              {index > 0 && config.orientation === "vertical" && (
                <div className="absolute -left-4 top-12 w-8 h-px bg-gray-300"></div>
              )}
              <OrgNode
                node={child}
                level={level + 1}
                isExpanded={isExpanded}
                onToggle={onToggle}
                onNodeClick={onNodeClick}
                config={config}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const OrgChart = ({
  data,
  config,
  onNodeClick,
  onConfigChange,
  className = "",
}: OrgChartProps) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-expand first few levels
    const autoExpand = (nodes: OrgChartNode[], currentLevel: number) => {
      if (currentLevel < config.expandLevel) {
        nodes.forEach((node) => {
          setExpandedNodes((prev) => new Set([...prev, node.id]));
          if (node.directReports) {
            autoExpand(node.directReports, currentLevel + 1);
          }
        });
      }
    };

    autoExpand(data, 0);
  }, [data, config.expandLevel]);

  const handleToggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));
  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleExport = () => {
    if (contentRef.current) {
      // Implement export functionality (PDF, PNG, etc.)
      console.log("Exporting org chart...");
    }
  };

  return (
    <div
      className={`relative w-full h-full bg-gray-50 rounded-lg overflow-hidden ${className}`}
    >
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button variant="outline" size="sm" onClick={handleZoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleZoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="p-2 space-y-2">
              <div className="text-sm font-medium">Chart Settings</div>
              <div className="space-y-1">
                <label className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={config.showPhotos}
                    onChange={(e) =>
                      onConfigChange?.({
                        ...config,
                        showPhotos: e.target.checked,
                      })
                    }
                    className="mr-2"
                  />
                  Show Photos
                </label>
                <label className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={config.showDetails}
                    onChange={(e) =>
                      onConfigChange?.({
                        ...config,
                        showDetails: e.target.checked,
                      })
                    }
                    className="mr-2"
                  />
                  Show Details
                </label>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Zoom indicator */}
      <div className="absolute bottom-4 right-4 z-10 bg-white/90 px-2 py-1 rounded text-sm font-medium">
        {Math.round(zoom * 100)}%
      </div>

      {/* Chart Container */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-auto"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "top left",
        }}
      >
        <div
          ref={contentRef}
          className="min-w-full min-h-full p-8 flex justify-center items-start"
        >
          <div className="space-y-8">
            {data.map((rootNode) => (
              <OrgNode
                key={rootNode.id}
                node={rootNode}
                level={0}
                isExpanded={expandedNodes.has(rootNode.id)}
                onToggle={handleToggleNode}
                onNodeClick={onNodeClick}
                config={config}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgChart;
