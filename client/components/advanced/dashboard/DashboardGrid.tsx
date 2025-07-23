import React, { useState, useCallback } from "react";
import { DashboardLayout, WidgetConfig } from "./types";
import { WidgetRenderer } from "./WidgetRenderer";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Badge } from "../../ui/badge";
import { Plus, Edit, Grid, Maximize2, RefreshCw, Save } from "lucide-react";
import { cn } from "../../../lib/utils";

interface DashboardGridProps {
  layout: DashboardLayout;
  editMode?: boolean;
  selectedWidget?: string | null;
  onWidgetSelect?: (id: string | null) => void;
  onWidgetUpdate?: (id: string, updates: Partial<WidgetConfig>) => void;
  onWidgetDelete?: (id: string) => void;
  onWidgetAdd?: () => void;
  onLayoutUpdate?: (layout: DashboardLayout) => void;
  onSave?: () => void;
  className?: string;
}

export function DashboardGrid({
  layout,
  editMode = false,
  selectedWidget,
  onWidgetSelect,
  onWidgetUpdate,
  onWidgetDelete,
  onWidgetAdd,
  onLayoutUpdate,
  onSave,
  className,
}: DashboardGridProps) {
  const [draggedWidget, setDraggedWidget] = useState<WidgetConfig | null>(null);
  const [dragOver, setDragOver] = useState<{ x: number; y: number } | null>(
    null,
  );

  // Calculate responsive columns based on screen size
  const getColumns = () => {
    if (typeof window === "undefined") return layout.cols.lg;

    const width = window.innerWidth;
    if (width >= layout.breakpoints.lg) return layout.cols.lg;
    if (width >= layout.breakpoints.md) return layout.cols.md;
    if (width >= layout.breakpoints.sm) return layout.cols.sm;
    return layout.cols.xs;
  };

  const [columns, setColumns] = useState(getColumns());

  // Update columns on window resize
  React.useEffect(() => {
    const handleResize = () => setColumns(getColumns());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [layout.breakpoints, layout.cols]);

  // Handle widget drag start
  const handleDragStart = useCallback(
    (widget: WidgetConfig) => {
      if (!editMode) return;
      setDraggedWidget(widget);
    },
    [editMode],
  );

  // Handle widget drag over
  const handleDragOver = useCallback(
    (e: React.DragEvent, x: number, y: number) => {
      if (!draggedWidget) return;
      e.preventDefault();
      setDragOver({ x, y });
    },
    [draggedWidget],
  );

  // Handle widget drop
  const handleDrop = useCallback(
    (e: React.DragEvent, x: number, y: number) => {
      e.preventDefault();
      if (!draggedWidget || !onWidgetUpdate) return;

      onWidgetUpdate(draggedWidget.id, {
        position: { ...draggedWidget.position, x, y },
      });

      setDraggedWidget(null);
      setDragOver(null);
    },
    [draggedWidget, onWidgetUpdate],
  );

  // Handle widget resize
  const handleResize = useCallback(
    (widget: WidgetConfig, newSize: { w: number; h: number }) => {
      if (!onWidgetUpdate) return;
      onWidgetUpdate(widget.id, {
        position: { ...widget.position, ...newSize },
      });
    },
    [onWidgetUpdate],
  );

  // Render grid cells
  const renderGrid = () => {
    const rows = Math.max(
      1,
      Math.max(...layout.widgets.map((w) => w.position.y + w.position.h)) || 1,
    );

    const cells = [];

    for (let y = 0; y < rows + 5; y++) {
      for (let x = 0; x < columns; x++) {
        const isOccupied = layout.widgets.some(
          (widget) =>
            x >= widget.position.x &&
            x < widget.position.x + widget.position.w &&
            y >= widget.position.y &&
            y < widget.position.y + widget.position.h,
        );

        const isDragOver = dragOver && dragOver.x === x && dragOver.y === y;

        if (!isOccupied) {
          cells.push(
            <div
              key={`${x}-${y}`}
              className={cn(
                "border border-dashed border-transparent rounded transition-colors",
                editMode && "border-muted hover:border-muted-foreground/50",
                isDragOver && "border-primary bg-primary/10",
                layout.settings.showGrid && editMode && "border-muted",
              )}
              style={{
                gridColumn: `${x + 1} / ${x + 2}`,
                gridRow: `${y + 1} / ${y + 2}`,
                height: layout.rowHeight,
                margin: `${layout.margin[1]}px ${layout.margin[0]}px`,
              }}
              onDragOver={(e) => handleDragOver(e, x, y)}
              onDrop={(e) => handleDrop(e, x, y)}
              onClick={() => editMode && onWidgetAdd?.()}
            >
              {editMode && !draggedWidget && (
                <div className="w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Plus className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>,
          );
        }
      }
    }

    return cells;
  };

  // Render widgets
  const renderWidgets = () => {
    return layout.widgets.map((widget) => {
      const isSelected = selectedWidget === widget.id;

      return (
        <div
          key={widget.id}
          className={cn(
            "relative transition-all duration-200",
            isSelected && "ring-2 ring-primary ring-offset-2",
            editMode && "cursor-move",
          )}
          style={{
            gridColumn: `${widget.position.x + 1} / ${widget.position.x + widget.position.w + 1}`,
            gridRow: `${widget.position.y + 1} / ${widget.position.y + widget.position.h + 1}`,
            margin: `${layout.margin[1]}px ${layout.margin[0]}px`,
          }}
          draggable={editMode && layout.settings.draggable}
          onDragStart={() => handleDragStart(widget)}
          onClick={() => onWidgetSelect?.(widget.id)}
        >
          <WidgetRenderer
            widget={widget}
            editMode={editMode}
            onEdit={(widget) => onWidgetUpdate?.(widget.id, widget)}
            onDelete={onWidgetDelete}
            className="h-full"
          />

          {/* Resize handles */}
          {editMode && layout.settings.resizable && isSelected && (
            <>
              {/* Corner resize handle */}
              <div
                className="absolute bottom-0 right-0 w-3 h-3 bg-primary cursor-se-resize"
                onMouseDown={(e) => {
                  e.preventDefault();
                  // Implement resize logic here
                }}
              />

              {/* Edge resize handles */}
              <div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-primary cursor-s-resize"
                onMouseDown={(e) => {
                  e.preventDefault();
                  // Implement vertical resize logic here
                }}
              />
              <div
                className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-6 bg-primary cursor-e-resize"
                onMouseDown={(e) => {
                  e.preventDefault();
                  // Implement horizontal resize logic here
                }}
              />
            </>
          )}
        </div>
      );
    });
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Dashboard Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{layout.name}</h1>
          {layout.description && (
            <p className="text-muted-foreground">{layout.description}</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {layout.tags && layout.tags.length > 0 && (
            <div className="flex space-x-1">
              {layout.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <Select
            value={columns.toString()}
            onValueChange={(value) => {
              const newCols = parseInt(value);
              setColumns(newCols);
              onLayoutUpdate?.({
                ...layout,
                columns: newCols,
              });
            }}
          >
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[6, 8, 10, 12, 16, 20, 24].map((col) => (
                <SelectItem key={col} value={col.toString()}>
                  {col} cols
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {editMode && (
            <>
              <Button variant="outline" size="sm" onClick={onWidgetAdd}>
                <Plus className="h-4 w-4 mr-2" />
                Add Widget
              </Button>

              <Button variant="outline" size="sm" onClick={onSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              layout.widgets.forEach((widget) => {
                onWidgetUpdate?.(widget.id, {
                  lastUpdated: new Date().toISOString(),
                });
              });
            }}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh All
          </Button>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div
        className="w-full relative"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: 0,
          backgroundColor: layout.theme?.backgroundColor,
        }}
      >
        {/* Grid background */}
        {renderGrid()}

        {/* Widgets */}
        {renderWidgets()}
      </div>

      {/* Empty State */}
      {layout.widgets.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Grid className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No widgets yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Start building your dashboard by adding your first widget
            </p>
            {editMode && (
              <Button onClick={onWidgetAdd}>
                <Plus className="h-4 w-4 mr-2" />
                Add Widget
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Dashboard Stats */}
      <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span>{layout.widgets.length} widgets</span>
          <span>{columns} columns</span>
          <span>Grid: {layout.rowHeight}px rows</span>
        </div>

        <div className="flex items-center space-x-2">
          <span>
            Last updated: {new Date(layout.updatedAt).toLocaleString()}
          </span>
          {layout.settings.autoSave && (
            <Badge variant="outline" className="text-xs">
              Auto-save enabled
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
