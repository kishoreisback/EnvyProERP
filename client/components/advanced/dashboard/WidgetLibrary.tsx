import React, { useState } from "react";
import { WidgetTemplate, WidgetType } from "./types";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Badge } from "../../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { ScrollArea } from "../../ui/scroll-area";
import {
  BarChart3,
  PieChart,
  Table,
  List,
  Calendar,
  Clock,
  TrendingUp,
  MapPin,
  Bell,
  Activity,
  FileText,
  Image,
  Gauge,
  Search,
  Plus,
  Users,
  DollarSign,
  Package,
  Building,
  Target,
  Zap,
} from "lucide-react";
import { cn } from "../../../lib/utils";

const widgetTemplates: WidgetTemplate[] = [
  // Analytics Widgets
  {
    type: "metric",
    name: "Revenue Metric",
    description: "Display key revenue metrics with trend indicators",
    icon: "DollarSign",
    category: "analytics",
    defaultConfig: {
      position: { x: 0, y: 0, w: 2, h: 2 },
      settings: {
        format: "currency",
        trend: "up",
        unit: "Monthly Revenue",
        showHeader: true,
      },
      staticData: 125000,
    },
    requiredData: ["value"],
    supportedDataSources: ["static", "api"],
  },
  {
    type: "metric",
    name: "User Count",
    description: "Show total users or active user count",
    icon: "Users",
    category: "analytics",
    defaultConfig: {
      position: { x: 0, y: 0, w: 2, h: 2 },
      settings: {
        format: "number",
        trend: "up",
        unit: "Active Users",
        showHeader: true,
      },
      staticData: 2847,
    },
    requiredData: ["value"],
    supportedDataSources: ["static", "api"],
  },
  {
    type: "chart",
    name: "Sales Chart",
    description: "Visualize sales data over time",
    icon: "BarChart3",
    category: "analytics",
    defaultConfig: {
      position: { x: 0, y: 0, w: 4, h: 3 },
      settings: {
        chartType: "bar",
        xAxis: "month",
        yAxis: ["sales"],
        showHeader: true,
      },
      staticData: [
        { month: "Jan", sales: 45000 },
        { month: "Feb", sales: 52000 },
        { month: "Mar", sales: 48000 },
        { month: "Apr", sales: 61000 },
        { month: "May", sales: 55000 },
      ],
    },
    requiredData: ["xAxis", "yAxis"],
    supportedDataSources: ["static", "api"],
  },
  {
    type: "chart",
    name: "Market Share",
    description: "Pie chart showing market distribution",
    icon: "PieChart",
    category: "analytics",
    defaultConfig: {
      position: { x: 0, y: 0, w: 3, h: 3 },
      settings: {
        chartType: "pie",
        xAxis: "segment",
        yAxis: ["percentage"],
        showHeader: true,
      },
      staticData: [
        { segment: "Enterprise", percentage: 45 },
        { segment: "SMB", percentage: 35 },
        { segment: "Startup", percentage: 20 },
      ],
    },
    requiredData: ["segments", "values"],
    supportedDataSources: ["static", "api"],
  },
  {
    type: "table",
    name: "Sales Table",
    description: "Tabular view of sales data",
    icon: "Table",
    category: "analytics",
    defaultConfig: {
      position: { x: 0, y: 0, w: 6, h: 4 },
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
          { key: "status", label: "Status", type: "status", sortable: false },
        ],
        sortable: true,
        pagination: true,
        pageSize: 5,
        showHeader: true,
      },
      staticData: [
        { name: "John Smith", revenue: 125000, deals: 12, status: "Active" },
        { name: "Sarah Johnson", revenue: 98000, deals: 8, status: "Active" },
        { name: "Mike Chen", revenue: 87000, deals: 10, status: "Active" },
        { name: "Lisa Brown", revenue: 76000, deals: 7, status: "Active" },
      ],
    },
    requiredData: ["rows"],
    supportedDataSources: ["static", "api"],
  },

  // Content Widgets
  {
    type: "list",
    name: "Recent Activities",
    description: "List of recent user activities",
    icon: "Activity",
    category: "content",
    defaultConfig: {
      position: { x: 0, y: 0, w: 3, h: 4 },
      settings: {
        showAvatar: true,
        showTimestamp: true,
        showHeader: true,
      },
      staticData: [
        {
          title: "New lead created",
          description: "Acme Corp - $50,000 opportunity",
          timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
          avatar: "/api/placeholder/32/32",
        },
        {
          title: "Deal closed",
          description: "TechStart Inc - $25,000 closed won",
          timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          avatar: "/api/placeholder/32/32",
        },
        {
          title: "Meeting scheduled",
          description: "Demo call with BigCorp",
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          avatar: "/api/placeholder/32/32",
        },
      ],
    },
    requiredData: ["items"],
    supportedDataSources: ["static", "api"],
  },
  {
    type: "text",
    name: "Announcement",
    description: "Display important announcements or notes",
    icon: "FileText",
    category: "content",
    defaultConfig: {
      position: { x: 0, y: 0, w: 4, h: 2 },
      settings: {
        content:
          "Welcome to the new dashboard! Check out the latest features and improvements.",
        markdown: false,
        showHeader: true,
      },
    },
    requiredData: [],
    supportedDataSources: ["static"],
  },
  {
    type: "calendar",
    name: "Upcoming Events",
    description: "Show upcoming calendar events",
    icon: "Calendar",
    category: "content",
    defaultConfig: {
      position: { x: 0, y: 0, w: 3, h: 3 },
      settings: {
        view: "agenda",
        showHeader: true,
      },
      staticData: [
        { title: "Team Standup", date: new Date().toISOString() },
        {
          title: "Client Presentation",
          date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          title: "Sprint Planning",
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
    },
    requiredData: ["events"],
    supportedDataSources: ["static", "api"],
  },

  // Productivity Widgets
  {
    type: "progress",
    name: "Goal Progress",
    description: "Track progress towards goals",
    icon: "Target",
    category: "productivity",
    defaultConfig: {
      position: { x: 0, y: 0, w: 2, h: 2 },
      settings: {
        progressValue: 65,
        progressMax: 100,
        progressType: "circular",
        showHeader: true,
      },
    },
    requiredData: ["value", "max"],
    supportedDataSources: ["static", "api", "computed"],
  },
  {
    type: "notification",
    name: "Notifications",
    description: "Display system notifications and alerts",
    icon: "Bell",
    category: "productivity",
    defaultConfig: {
      position: { x: 0, y: 0, w: 3, h: 3 },
      settings: {
        showHeader: true,
      },
      staticData: [
        {
          title: "System maintenance scheduled",
          priority: "high",
          timestamp: new Date().toISOString(),
          read: false,
        },
        {
          title: "Backup completed successfully",
          priority: "low",
          timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
          read: true,
        },
        {
          title: "New user registration",
          priority: "medium",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          read: false,
        },
      ],
    },
    requiredData: ["notifications"],
    supportedDataSources: ["static", "api", "websocket"],
  },
  {
    type: "clock",
    name: "World Clock",
    description: "Display current time and date",
    icon: "Clock",
    category: "productivity",
    defaultConfig: {
      position: { x: 0, y: 0, w: 2, h: 2 },
      settings: {
        showHeader: true,
      },
    },
    requiredData: [],
    supportedDataSources: ["static"],
  },
  {
    type: "weather",
    name: "Weather Widget",
    description: "Current weather information",
    icon: "MapPin",
    category: "productivity",
    defaultConfig: {
      position: { x: 0, y: 0, w: 2, h: 2 },
      settings: {
        showHeader: true,
      },
      staticData: {
        location: "Mumbai, India",
        temperature: 28,
        condition: "Partly Cloudy",
        humidity: 65,
      },
    },
    requiredData: ["weather"],
    supportedDataSources: ["static", "api"],
  },

  // Business Specific Widgets
  {
    type: "metric",
    name: "Inventory Count",
    description: "Track inventory levels",
    icon: "Package",
    category: "custom",
    defaultConfig: {
      position: { x: 0, y: 0, w: 2, h: 2 },
      settings: {
        format: "number",
        unit: "Items in Stock",
        showHeader: true,
      },
      staticData: 1847,
    },
    requiredData: ["count"],
    supportedDataSources: ["static", "api"],
  },
  {
    type: "metric",
    name: "Project Count",
    description: "Number of active projects",
    icon: "Building",
    category: "custom",
    defaultConfig: {
      position: { x: 0, y: 0, w: 2, h: 2 },
      settings: {
        format: "number",
        unit: "Active Projects",
        trend: "up",
        showHeader: true,
      },
      staticData: 23,
    },
    requiredData: ["count"],
    supportedDataSources: ["static", "api"],
  },
  {
    type: "chart",
    name: "Performance Metrics",
    description: "Key performance indicators over time",
    icon: "TrendingUp",
    category: "custom",
    defaultConfig: {
      position: { x: 0, y: 0, w: 4, h: 3 },
      settings: {
        chartType: "line",
        xAxis: "date",
        yAxis: ["performance"],
        showHeader: true,
      },
      staticData: [
        { date: "Week 1", performance: 85 },
        { date: "Week 2", performance: 88 },
        { date: "Week 3", performance: 92 },
        { date: "Week 4", performance: 89 },
        { date: "Week 5", performance: 95 },
      ],
    },
    requiredData: ["dates", "metrics"],
    supportedDataSources: ["static", "api"],
  },
];

interface WidgetLibraryProps {
  onSelectWidget: (template: WidgetTemplate) => void;
}

export function WidgetLibrary({ onSelectWidget }: WidgetLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Widgets", count: widgetTemplates.length },
    {
      id: "analytics",
      label: "Analytics",
      count: widgetTemplates.filter((w) => w.category === "analytics").length,
    },
    {
      id: "content",
      label: "Content",
      count: widgetTemplates.filter((w) => w.category === "content").length,
    },
    {
      id: "productivity",
      label: "Productivity",
      count: widgetTemplates.filter((w) => w.category === "productivity")
        .length,
    },
    {
      id: "custom",
      label: "Business",
      count: widgetTemplates.filter((w) => w.category === "custom").length,
    },
  ];

  const filteredTemplates = widgetTemplates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getWidgetIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      BarChart3: <BarChart3 className="h-6 w-6" />,
      PieChart: <PieChart className="h-6 w-6" />,
      Table: <Table className="h-6 w-6" />,
      List: <List className="h-6 w-6" />,
      Calendar: <Calendar className="h-6 w-6" />,
      Clock: <Clock className="h-6 w-6" />,
      TrendingUp: <TrendingUp className="h-6 w-6" />,
      MapPin: <MapPin className="h-6 w-6" />,
      Bell: <Bell className="h-6 w-6" />,
      Activity: <Activity className="h-6 w-6" />,
      FileText: <FileText className="h-6 w-6" />,
      Image: <Image className="h-6 w-6" />,
      Gauge: <Gauge className="h-6 w-6" />,
      Users: <Users className="h-6 w-6" />,
      DollarSign: <DollarSign className="h-6 w-6" />,
      Package: <Package className="h-6 w-6" />,
      Building: <Building className="h-6 w-6" />,
      Target: <Target className="h-6 w-6" />,
      Zap: <Zap className="h-6 w-6" />,
    };
    return iconMap[iconName] || <Zap className="h-6 w-6" />;
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search widgets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-5">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="flex flex-col space-y-1"
            >
              <span className="text-xs">{category.label}</span>
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <ScrollArea className="h-96">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
                {filteredTemplates
                  .filter(
                    (template) =>
                      category.id === "all" ||
                      template.category === category.id,
                  )
                  .map((template) => (
                    <Card
                      key={`${template.type}-${template.name}`}
                      className="cursor-pointer transition-all hover:shadow-md hover:scale-105"
                      onClick={() => onSelectWidget(template)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            {getWidgetIcon(template.icon)}
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-sm">
                              {template.name}
                            </CardTitle>
                            <Badge variant="outline" className="text-xs mt-1">
                              {template.type}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <CardDescription className="text-xs mb-3">
                          {template.description}
                        </CardDescription>

                        {/* Preview */}
                        <div className="bg-muted/30 rounded border p-2 mb-3">
                          <div className="text-xs text-muted-foreground mb-1">
                            Preview:
                          </div>
                          <div className="h-16 bg-gradient-to-br from-primary/5 to-primary/10 rounded flex items-center justify-center">
                            {getWidgetIcon(template.icon)}
                          </div>
                        </div>

                        {/* Data Requirements */}
                        {template.requiredData &&
                          template.requiredData.length > 0 && (
                            <div className="mb-2">
                              <div className="text-xs text-muted-foreground mb-1">
                                Requires:
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {template.requiredData
                                  .slice(0, 2)
                                  .map((req) => (
                                    <Badge
                                      key={req}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {req}
                                    </Badge>
                                  ))}
                                {template.requiredData.length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{template.requiredData.length - 2}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}

                        <Button size="sm" className="w-full">
                          <Plus className="h-3 w-3 mr-2" />
                          Add Widget
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>

              {filteredTemplates.filter(
                (template) =>
                  category.id === "all" || template.category === category.id,
              ).length === 0 && (
                <div className="text-center py-8">
                  <div className="text-muted-foreground">No widgets found</div>
                  {searchQuery && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => setSearchQuery("")}
                    >
                      Clear search
                    </Button>
                  )}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
