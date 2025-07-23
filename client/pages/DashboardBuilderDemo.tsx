import React, { useState } from "react";
import { MainLayout } from "../components/layout/MainLayout";
import {
  DashboardBuilder,
  DashboardLayout,
  defaultDashboardLayout,
} from "../components/advanced/dashboard";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, Download, Upload } from "lucide-react";
import { useToast } from "../components/ui/use-toast";
import { useNavigate } from "react-router-dom";

// Sample dashboard templates
const dashboardTemplates: DashboardLayout[] = [
  {
    id: "sales-dashboard",
    name: "Sales Dashboard",
    description: "Track sales performance and revenue metrics",
    columns: 12,
    rowHeight: 60,
    margin: [16, 16],
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480 },
    cols: { lg: 12, md: 10, sm: 6, xs: 4 },
    widgets: [
      {
        id: "total-revenue",
        type: "metric",
        title: "Total Revenue",
        description: "Monthly revenue performance",
        position: { x: 0, y: 0, w: 3, h: 2 },
        settings: {
          format: "currency",
          trend: "up",
          unit: "This Month",
          showHeader: true,
          accentColor: "#22c55e",
        },
        staticData: 2847500,
        autoRefresh: true,
        refreshInterval: 300,
        lastUpdated: new Date().toISOString(),
      },
      {
        id: "sales-deals",
        type: "metric",
        title: "Deals Closed",
        description: "Number of deals closed this month",
        position: { x: 3, y: 0, w: 3, h: 2 },
        settings: {
          format: "number",
          trend: "up",
          unit: "Deals",
          showHeader: true,
          accentColor: "#3b82f6",
        },
        staticData: 127,
        autoRefresh: true,
        refreshInterval: 600,
        lastUpdated: new Date().toISOString(),
      },
      {
        id: "conversion-rate",
        type: "metric",
        title: "Conversion Rate",
        description: "Lead to customer conversion rate",
        position: { x: 6, y: 0, w: 3, h: 2 },
        settings: {
          format: "percentage",
          trend: "up",
          unit: "Conversion",
          showHeader: true,
          accentColor: "#f59e0b",
        },
        staticData: 18.5,
        autoRefresh: true,
        refreshInterval: 1800,
        lastUpdated: new Date().toISOString(),
      },
      {
        id: "avg-deal-size",
        type: "metric",
        title: "Avg Deal Size",
        description: "Average deal value",
        position: { x: 9, y: 0, w: 3, h: 2 },
        settings: {
          format: "currency",
          trend: "up",
          unit: "Per Deal",
          showHeader: true,
          accentColor: "#ef4444",
        },
        staticData: 22421,
        autoRefresh: true,
        refreshInterval: 3600,
        lastUpdated: new Date().toISOString(),
      },
      {
        id: "sales-trend",
        type: "chart",
        title: "Monthly Sales Trend",
        description: "Sales performance over the last 6 months",
        position: { x: 0, y: 2, w: 8, h: 4 },
        settings: {
          chartType: "bar",
          xAxis: "month",
          yAxis: ["sales"],
          showHeader: true,
        },
        staticData: [
          { month: "Jan", sales: 2100000 },
          { month: "Feb", sales: 2350000 },
          { month: "Mar", sales: 2180000 },
          { month: "Apr", sales: 2790000 },
          { month: "May", sales: 2650000 },
          { month: "Jun", sales: 2847500 },
        ],
        autoRefresh: true,
        refreshInterval: 1800,
        lastUpdated: new Date().toISOString(),
      },
      {
        id: "top-salespeople",
        type: "table",
        title: "Top Performers",
        description: "Best performing sales representatives",
        position: { x: 8, y: 2, w: 4, h: 4 },
        settings: {
          columns: [
            { key: "name", label: "Salesperson", type: "text", sortable: true },
            {
              key: "revenue",
              label: "Revenue",
              type: "currency",
              sortable: true,
            },
            { key: "deals", label: "Deals", type: "number", sortable: true },
          ],
          sortable: true,
          pagination: false,
          pageSize: 5,
          showHeader: true,
        },
        staticData: [
          { name: "Raj Sharma", revenue: 325000, deals: 15 },
          { name: "Priya Patel", revenue: 298000, deals: 12 },
          { name: "Amit Kumar", revenue: 287000, deals: 14 },
          { name: "Sneha Singh", revenue: 276000, deals: 11 },
          { name: "Vikram Gupta", revenue: 245000, deals: 10 },
        ],
        autoRefresh: true,
        refreshInterval: 3600,
        lastUpdated: new Date().toISOString(),
      },
    ],
    settings: {
      editable: true,
      resizable: true,
      draggable: true,
      showGrid: false,
      autoSave: true,
      saveInterval: 30,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "admin",
    tags: ["sales", "revenue", "performance"],
    public: false,
    favorite: false,
  },
  {
    id: "hr-dashboard",
    name: "HR Analytics Dashboard",
    description: "Human resources metrics and employee analytics",
    columns: 12,
    rowHeight: 60,
    margin: [16, 16],
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480 },
    cols: { lg: 12, md: 10, sm: 6, xs: 4 },
    widgets: [
      {
        id: "total-employees",
        type: "metric",
        title: "Total Employees",
        description: "Current workforce count",
        position: { x: 0, y: 0, w: 3, h: 2 },
        settings: {
          format: "number",
          unit: "Employees",
          showHeader: true,
          accentColor: "#3b82f6",
        },
        staticData: 1847,
        autoRefresh: true,
        refreshInterval: 3600,
        lastUpdated: new Date().toISOString(),
      },
      {
        id: "new-hires",
        type: "metric",
        title: "New Hires",
        description: "Employees joined this month",
        position: { x: 3, y: 0, w: 3, h: 2 },
        settings: {
          format: "number",
          trend: "up",
          unit: "This Month",
          showHeader: true,
          accentColor: "#22c55e",
        },
        staticData: 47,
        autoRefresh: true,
        refreshInterval: 3600,
        lastUpdated: new Date().toISOString(),
      },
      {
        id: "attrition-rate",
        type: "metric",
        title: "Attrition Rate",
        description: "Monthly employee turnover",
        position: { x: 6, y: 0, w: 3, h: 2 },
        settings: {
          format: "percentage",
          trend: "down",
          unit: "Turnover",
          showHeader: true,
          accentColor: "#f59e0b",
        },
        staticData: 3.2,
        autoRefresh: true,
        refreshInterval: 3600,
        lastUpdated: new Date().toISOString(),
      },
      {
        id: "satisfaction",
        type: "metric",
        title: "Employee Satisfaction",
        description: "Average satisfaction score",
        position: { x: 9, y: 0, w: 3, h: 2 },
        settings: {
          format: "number",
          trend: "up",
          unit: "/ 5.0",
          showHeader: true,
          accentColor: "#8b5cf6",
        },
        staticData: 4.3,
        autoRefresh: true,
        refreshInterval: 3600,
        lastUpdated: new Date().toISOString(),
      },
      {
        id: "department-headcount",
        type: "chart",
        title: "Department Headcount",
        description: "Employee distribution by department",
        position: { x: 0, y: 2, w: 6, h: 4 },
        settings: {
          chartType: "pie",
          xAxis: "department",
          yAxis: ["count"],
          showHeader: true,
        },
        staticData: [
          { department: "Engineering", count: 687 },
          { department: "Sales", count: 234 },
          { department: "Marketing", count: 156 },
          { department: "HR", count: 89 },
          { department: "Finance", count: 134 },
          { department: "Operations", count: 298 },
          { department: "Support", count: 249 },
        ],
        autoRefresh: true,
        refreshInterval: 3600,
        lastUpdated: new Date().toISOString(),
      },
      {
        id: "recent-activities",
        type: "list",
        title: "Recent HR Activities",
        description: "Latest HR system activities",
        position: { x: 6, y: 2, w: 6, h: 4 },
        settings: {
          showAvatar: true,
          showTimestamp: true,
          showHeader: true,
        },
        staticData: [
          {
            title: "New employee onboarded",
            description: "Rahul Verma joined Engineering team",
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            type: "success",
          },
          {
            title: "Performance review completed",
            description: "Q2 reviews completed for Sales team",
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            type: "success",
          },
          {
            title: "Training session scheduled",
            description: "Leadership training for managers",
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            type: "warning",
          },
          {
            title: "Leave request approved",
            description: "Annual leave approved for 5 employees",
            timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
            type: "success",
          },
        ],
        autoRefresh: true,
        refreshInterval: 300,
        lastUpdated: new Date().toISOString(),
      },
    ],
    settings: {
      editable: true,
      resizable: true,
      draggable: true,
      showGrid: false,
      autoSave: true,
      saveInterval: 30,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "admin",
    tags: ["hr", "employees", "analytics"],
    public: false,
    favorite: false,
  },
];

export default function DashboardBuilderDemo() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] =
    useState<DashboardLayout | null>(null);

  const handleSave = (layout: DashboardLayout) => {
    console.log("Dashboard saved:", layout);
    toast({
      title: "Dashboard Saved Successfully",
      description: `Dashboard "${layout.name}" has been saved to your library.`,
    });
  };

  const handleExport = (layout: DashboardLayout) => {
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

    toast({
      title: "Dashboard Exported",
      description: "Dashboard configuration has been downloaded as JSON file.",
    });
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedLayout = JSON.parse(e.target?.result as string);
          setSelectedTemplate({
            ...importedLayout,
            id: `imported_${Date.now()}`,
            updatedAt: new Date().toISOString(),
          });
          toast({
            title: "Dashboard Imported",
            description: "Dashboard configuration loaded successfully.",
          });
        } catch (error) {
          toast({
            title: "Import Error",
            description:
              "Failed to import dashboard. Please check the file format.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  if (selectedTemplate) {
    return (
      <DashboardBuilder
        initialLayout={selectedTemplate}
        onSave={(layout) => {
          handleSave(layout);
          setSelectedTemplate(null);
        }}
        onPreview={(layout) => {
          console.log("Preview dashboard:", layout);
          toast({
            title: "Preview Mode",
            description: "Dashboard preview functionality would open here.",
          });
        }}
      />
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate("/advanced-patterns")}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Advanced Patterns
            </Button>
            <h1 className="text-4xl font-bold mb-2">Dashboard Builder</h1>
            <p className="text-xl text-muted-foreground">
              Create interactive dashboards with drag-and-drop widgets
            </p>
          </div>
          <div className="flex space-x-2">
            <label>
              <Button variant="outline" asChild>
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  Import Dashboard
                </span>
              </Button>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
            <Button onClick={() => setSelectedTemplate(defaultDashboardLayout)}>
              Create New Dashboard
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {dashboardTemplates.map((template) => (
            <Card key={template.id} className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {template.name}
                  {template.favorite && (
                    <Badge variant="secondary">Favorite</Badge>
                  )}
                </CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">
                    {template.widgets.length} widgets
                  </Badge>
                  <Badge variant="outline">{template.columns} columns</Badge>
                  {template.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Widget Types:</h4>
                  <div className="flex flex-wrap gap-1">
                    {Array.from(
                      new Set(template.widgets.map((w) => w.type)),
                    ).map((type) => (
                      <span
                        key={type}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Features:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {template.settings.draggable && (
                      <li>• Drag & drop widgets</li>
                    )}
                    {template.settings.resizable && (
                      <li>• Resizable widgets</li>
                    )}
                    {template.settings.autoSave && <li>• Auto-save changes</li>}
                    <li>• Responsive layout</li>
                    <li>• Real-time data updates</li>
                  </ul>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => setSelectedTemplate(template)}
                  >
                    Edit Template
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExport(template)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Builder Features</CardTitle>
              <CardDescription>
                Comprehensive dashboard building capabilities for business
                intelligence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Widget Types</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Metric cards with trends</li>
                    <li>• Charts (bar, pie, line, area)</li>
                    <li>• Data tables with sorting</li>
                    <li>• Activity feeds and lists</li>
                    <li>• Progress indicators</li>
                    <li>• Calendar widgets</li>
                    <li>• Clock and weather widgets</li>
                    <li>• Notification centers</li>
                    <li>• Custom text and media</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Advanced Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Drag-and-drop interface</li>
                    <li>• Responsive grid system</li>
                    <li>• Real-time data refresh</li>
                    <li>• Widget configuration panel</li>
                    <li>• Dashboard themes</li>
                    <li>• Export/import dashboards</li>
                    <li>• Auto-save functionality</li>
                    <li>• Multiple breakpoints</li>
                    <li>• Widget templates library</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Data Integration</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Static data support</li>
                    <li>• REST API integration</li>
                    <li>• WebSocket real-time data</li>
                    <li>• Computed metrics</li>
                    <li>• Data transformers</li>
                    <li>• Custom data sources</li>
                    <li>• Conditional data loading</li>
                    <li>• Error handling</li>
                    <li>• Loading states</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
