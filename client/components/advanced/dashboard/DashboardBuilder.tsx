import React, { useState } from "react";
import {
  DashboardLayout,
  WidgetConfig,
  WidgetTemplate,
  defaultDashboardLayout,
} from "./types";
import { DashboardGrid } from "./DashboardGrid";
import { WidgetLibrary } from "./WidgetLibrary";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Switch } from "../../ui/switch";
import { Separator } from "../../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { ScrollArea } from "../../ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  Settings,
  Eye,
  Save,
  Download,
  Upload,
  Plus,
  Grid,
  Palette,
  Layout,
  Code,
} from "lucide-react";
import { cn } from "../../../lib/utils";

interface DashboardBuilderProps {
  initialLayout?: DashboardLayout;
  onSave: (layout: DashboardLayout) => void;
  onPreview?: (layout: DashboardLayout) => void;
}

export function DashboardBuilder({
  initialLayout,
  onSave,
  onPreview,
}: DashboardBuilderProps) {
  const [layout, setLayout] = useState<DashboardLayout>(
    initialLayout || defaultDashboardLayout,
  );
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(true);
  const [activeTab, setActiveTab] = useState("widgets");
  const [showAddWidget, setShowAddWidget] = useState(false);

  // Add widget to dashboard
  const addWidget = (template: WidgetTemplate) => {
    const newWidget: WidgetConfig = {
      id: `widget_${Date.now()}`,
      type: template.type,
      title: template.name,
      description: template.description,
      position: findEmptyPosition(),
      settings: {
        showHeader: true,
        showBorder: true,
        ...template.defaultConfig?.settings,
      },
      autoRefresh: false,
      refreshInterval: 30,
      lastUpdated: new Date().toISOString(),
      ...template.defaultConfig,
    };

    setLayout((prev) => ({
      ...prev,
      widgets: [...prev.widgets, newWidget],
      updatedAt: new Date().toISOString(),
    }));

    setSelectedWidget(newWidget.id);
    setShowAddWidget(false);
  };

  // Find empty position for new widget
  const findEmptyPosition = () => {
    const occupiedPositions = new Set();
    layout.widgets.forEach((widget) => {
      for (
        let x = widget.position.x;
        x < widget.position.x + widget.position.w;
        x++
      ) {
        for (
          let y = widget.position.y;
          y < widget.position.y + widget.position.h;
          y++
        ) {
          occupiedPositions.add(`${x},${y}`);
        }
      }
    });

    // Find first available 2x2 position
    for (let y = 0; y < 100; y++) {
      for (let x = 0; x <= layout.columns - 2; x++) {
        let canPlace = true;
        for (let dx = 0; dx < 2; dx++) {
          for (let dy = 0; dy < 2; dy++) {
            if (occupiedPositions.has(`${x + dx},${y + dy}`)) {
              canPlace = false;
              break;
            }
          }
          if (!canPlace) break;
        }
        if (canPlace) {
          return { x, y, w: 2, h: 2 };
        }
      }
    }

    return { x: 0, y: 0, w: 2, h: 2 };
  };

  // Update widget
  const updateWidget = (id: string, updates: Partial<WidgetConfig>) => {
    setLayout((prev) => ({
      ...prev,
      widgets: prev.widgets.map((widget) =>
        widget.id === id ? { ...widget, ...updates } : widget,
      ),
      updatedAt: new Date().toISOString(),
    }));
  };

  // Delete widget
  const deleteWidget = (id: string) => {
    setLayout((prev) => ({
      ...prev,
      widgets: prev.widgets.filter((widget) => widget.id !== id),
      updatedAt: new Date().toISOString(),
    }));

    if (selectedWidget === id) {
      setSelectedWidget(null);
    }
  };

  // Duplicate widget
  const duplicateWidget = (id: string) => {
    const widget = layout.widgets.find((w) => w.id === id);
    if (widget) {
      const newWidget: WidgetConfig = {
        ...widget,
        id: `widget_${Date.now()}`,
        title: `${widget.title} (Copy)`,
        position: findEmptyPosition(),
      };
      setLayout((prev) => ({
        ...prev,
        widgets: [...prev.widgets, newWidget],
        updatedAt: new Date().toISOString(),
      }));
    }
  };

  // Update layout settings
  const updateLayoutSettings = (updates: Partial<DashboardLayout>) => {
    setLayout((prev) => ({
      ...prev,
      ...updates,
      updatedAt: new Date().toISOString(),
    }));
  };

  // Save dashboard
  const handleSave = () => {
    onSave(layout);
  };

  // Export dashboard
  const handleExport = () => {
    const dataStr = JSON.stringify(layout, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${layout.name.replace(/\s+/g, "_")}_dashboard.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Import dashboard
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedLayout = JSON.parse(e.target?.result as string);
          setLayout({
            ...importedLayout,
            id: `imported_${Date.now()}`,
            updatedAt: new Date().toISOString(),
          });
        } catch (error) {
          console.error("Failed to import dashboard:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const selectedWidgetData = layout.widgets.find(
    (w) => w.id === selectedWidget,
  );

  return (
    <div className="h-screen flex">
      {/* Left Sidebar */}
      <div className="w-80 border-r bg-muted/10 flex flex-col">
        <div className="p-4 border-b">
          <h2 className="font-semibold mb-2">Dashboard Builder</h2>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant={editMode ? "default" : "outline"}
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Edit Mode" : "Preview Mode"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onPreview?.(layout)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <TabsList className="grid w-full grid-cols-3 mx-4 mt-4">
            <TabsTrigger value="widgets">Widgets</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
          </TabsList>

          <TabsContent value="widgets" className="flex-1 p-4">
            <ScrollArea className="h-full">
              <div className="space-y-4">
                <Button
                  className="w-full"
                  onClick={() => setShowAddWidget(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Widget
                </Button>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-medium">Current Widgets</h3>
                  {layout.widgets.map((widget) => (
                    <Card
                      key={widget.id}
                      className={cn(
                        "cursor-pointer transition-colors",
                        selectedWidget === widget.id && "ring-2 ring-primary",
                      )}
                      onClick={() => setSelectedWidget(widget.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm">
                              {widget.title}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {widget.type} • {widget.position.w}×
                              {widget.position.h}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteWidget(widget.id);
                            }}
                          >
                            ×
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {layout.widgets.length === 0 && (
                    <div className="text-center text-muted-foreground py-8">
                      No widgets added yet
                    </div>
                  )}
                </div>

                {/* Widget Properties */}
                {selectedWidgetData && (
                  <div className="space-y-4">
                    <Separator />
                    <h3 className="font-medium">Widget Properties</h3>

                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="widget-title">Title</Label>
                        <Input
                          id="widget-title"
                          value={selectedWidgetData.title}
                          onChange={(e) =>
                            updateWidget(selectedWidgetData.id, {
                              title: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <Label htmlFor="widget-description">Description</Label>
                        <Textarea
                          id="widget-description"
                          value={selectedWidgetData.description || ""}
                          onChange={(e) =>
                            updateWidget(selectedWidgetData.id, {
                              description: e.target.value,
                            })
                          }
                          rows={2}
                        />
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        <div>
                          <Label>X</Label>
                          <Input
                            type="number"
                            value={selectedWidgetData.position.x}
                            onChange={(e) =>
                              updateWidget(selectedWidgetData.id, {
                                position: {
                                  ...selectedWidgetData.position,
                                  x: Number(e.target.value),
                                },
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label>Y</Label>
                          <Input
                            type="number"
                            value={selectedWidgetData.position.y}
                            onChange={(e) =>
                              updateWidget(selectedWidgetData.id, {
                                position: {
                                  ...selectedWidgetData.position,
                                  y: Number(e.target.value),
                                },
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label>W</Label>
                          <Input
                            type="number"
                            value={selectedWidgetData.position.w}
                            onChange={(e) =>
                              updateWidget(selectedWidgetData.id, {
                                position: {
                                  ...selectedWidgetData.position,
                                  w: Number(e.target.value),
                                },
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label>H</Label>
                          <Input
                            type="number"
                            value={selectedWidgetData.position.h}
                            onChange={(e) =>
                              updateWidget(selectedWidgetData.id, {
                                position: {
                                  ...selectedWidgetData.position,
                                  h: Number(e.target.value),
                                },
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="auto-refresh"
                          checked={selectedWidgetData.autoRefresh || false}
                          onCheckedChange={(checked) =>
                            updateWidget(selectedWidgetData.id, {
                              autoRefresh: checked,
                            })
                          }
                        />
                        <Label htmlFor="auto-refresh">Auto Refresh</Label>
                      </div>

                      {selectedWidgetData.autoRefresh && (
                        <div>
                          <Label htmlFor="refresh-interval">
                            Refresh Interval (seconds)
                          </Label>
                          <Input
                            id="refresh-interval"
                            type="number"
                            value={selectedWidgetData.refreshInterval || 30}
                            onChange={(e) =>
                              updateWidget(selectedWidgetData.id, {
                                refreshInterval: Number(e.target.value),
                              })
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="settings" className="flex-1 p-4">
            <ScrollArea className="h-full">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="dashboard-name">Dashboard Name</Label>
                  <Input
                    id="dashboard-name"
                    value={layout.name}
                    onChange={(e) =>
                      updateLayoutSettings({ name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="dashboard-description">Description</Label>
                  <Textarea
                    id="dashboard-description"
                    value={layout.description || ""}
                    onChange={(e) =>
                      updateLayoutSettings({ description: e.target.value })
                    }
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="dashboard-columns">Columns</Label>
                  <Select
                    value={layout.columns.toString()}
                    onValueChange={(value) =>
                      updateLayoutSettings({ columns: Number(value) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[6, 8, 10, 12, 16, 20, 24].map((cols) => (
                        <SelectItem key={cols} value={cols.toString()}>
                          {cols} columns
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="row-height">Row Height (px)</Label>
                  <Input
                    id="row-height"
                    type="number"
                    value={layout.rowHeight}
                    onChange={(e) =>
                      updateLayoutSettings({
                        rowHeight: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-medium">Grid Settings</h3>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="draggable"
                      checked={layout.settings.draggable || false}
                      onCheckedChange={(checked) =>
                        updateLayoutSettings({
                          settings: { ...layout.settings, draggable: checked },
                        })
                      }
                    />
                    <Label htmlFor="draggable">Draggable Widgets</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="resizable"
                      checked={layout.settings.resizable || false}
                      onCheckedChange={(checked) =>
                        updateLayoutSettings({
                          settings: { ...layout.settings, resizable: checked },
                        })
                      }
                    />
                    <Label htmlFor="resizable">Resizable Widgets</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="show-grid"
                      checked={layout.settings.showGrid || false}
                      onCheckedChange={(checked) =>
                        updateLayoutSettings({
                          settings: { ...layout.settings, showGrid: checked },
                        })
                      }
                    />
                    <Label htmlFor="show-grid">Show Grid</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="auto-save"
                      checked={layout.settings.autoSave || false}
                      onCheckedChange={(checked) =>
                        updateLayoutSettings({
                          settings: { ...layout.settings, autoSave: checked },
                        })
                      }
                    />
                    <Label htmlFor="auto-save">Auto Save</Label>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-medium">Import/Export</h3>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={handleExport}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>

                    <label>
                      <Button size="sm" variant="outline" asChild>
                        <span>
                          <Upload className="h-4 w-4 mr-2" />
                          Import
                        </span>
                      </Button>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImport}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="style" className="flex-1 p-4">
            <ScrollArea className="h-full">
              <div className="space-y-4">
                <h3 className="font-medium">Theme</h3>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <Input
                      id="primary-color"
                      type="color"
                      value={layout.theme?.primaryColor || "#000000"}
                      onChange={(e) =>
                        updateLayoutSettings({
                          theme: {
                            ...layout.theme,
                            primaryColor: e.target.value,
                          },
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="background-color">Background Color</Label>
                    <Input
                      id="background-color"
                      type="color"
                      value={layout.theme?.backgroundColor || "#ffffff"}
                      onChange={(e) =>
                        updateLayoutSettings({
                          theme: {
                            ...layout.theme,
                            backgroundColor: e.target.value,
                          },
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="text-color">Text Color</Label>
                    <Input
                      id="text-color"
                      type="color"
                      value={layout.theme?.textColor || "#000000"}
                      onChange={(e) =>
                        updateLayoutSettings({
                          theme: { ...layout.theme, textColor: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="border-radius">Border Radius</Label>
                    <Select
                      value={layout.theme?.borderRadius || "medium"}
                      onValueChange={(value) =>
                        updateLayoutSettings({
                          theme: { ...layout.theme, borderRadius: value },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="p-4 border-t">
          <Button className="w-full" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Dashboard
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <DashboardGrid
          layout={layout}
          editMode={editMode}
          selectedWidget={selectedWidget}
          onWidgetSelect={setSelectedWidget}
          onWidgetUpdate={updateWidget}
          onWidgetDelete={deleteWidget}
          onWidgetAdd={() => setShowAddWidget(true)}
          onLayoutUpdate={updateLayoutSettings}
          onSave={handleSave}
          className="p-6"
        />
      </div>

      {/* Add Widget Dialog */}
      <Dialog open={showAddWidget} onOpenChange={setShowAddWidget}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Add Widget</DialogTitle>
            <DialogDescription>
              Choose a widget type to add to your dashboard
            </DialogDescription>
          </DialogHeader>
          <WidgetLibrary onSelectWidget={addWidget} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
