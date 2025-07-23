// Widget Types
export type WidgetType =
  | "metric"
  | "chart"
  | "table"
  | "list"
  | "calendar"
  | "kanban"
  | "progress"
  | "text"
  | "image"
  | "iframe"
  | "activity"
  | "notification"
  | "weather"
  | "clock"
  | "map"
  | "form"
  | "custom";

// Chart Types
export type ChartType =
  | "line"
  | "bar"
  | "pie"
  | "doughnut"
  | "area"
  | "scatter"
  | "radar"
  | "gauge"
  | "funnel"
  | "heatmap";

// Data Source Types
export interface DataSource {
  type: "static" | "api" | "websocket" | "computed";
  url?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  params?: Record<string, any>;
  body?: any;
  refreshInterval?: number; // seconds
  transformer?: string; // JavaScript function as string
  mockData?: any; // For development/preview
}

// Widget Configuration
export interface WidgetConfig {
  id: string;
  type: WidgetType;
  title: string;
  description?: string;

  // Layout
  position: {
    x: number;
    y: number;
    w: number;
    h: number;
  };

  // Data
  dataSource?: DataSource;
  staticData?: any;

  // Display Settings
  settings: {
    // Chart specific
    chartType?: ChartType;
    xAxis?: string;
    yAxis?: string[];
    groupBy?: string;

    // Metric specific
    value?: string;
    target?: number;
    unit?: string;
    format?: "number" | "currency" | "percentage" | "duration";
    trend?: "up" | "down" | "neutral";

    // Table specific
    columns?: TableColumn[];
    sortable?: boolean;
    filterable?: boolean;
    pagination?: boolean;
    pageSize?: number;

    // List specific
    itemTemplate?: string;
    showAvatar?: boolean;
    showTimestamp?: boolean;

    // Progress specific
    progressValue?: number;
    progressMax?: number;
    progressType?: "linear" | "circular";

    // Text specific
    content?: string;
    markdown?: boolean;

    // Calendar specific
    eventSource?: string;
    view?: "month" | "week" | "day" | "agenda";

    // Appearance
    showHeader?: boolean;
    showBorder?: boolean;
    backgroundColor?: string;
    textColor?: string;
    accentColor?: string;

    // Interactions
    clickable?: boolean;
    drillDown?: string;
    modalContent?: string;
  };

  // Conditional Display
  visibility?: {
    condition?: string; // JavaScript expression
    roles?: string[];
    timeRange?: {
      start: string;
      end: string;
    };
  };

  // Refresh Settings
  autoRefresh?: boolean;
  refreshInterval?: number;
  lastUpdated?: string;

  // Widget State
  loading?: boolean;
  error?: string;
  data?: any;
}

// Table Column Configuration
export interface TableColumn {
  key: string;
  label: string;
  type: "text" | "number" | "date" | "currency" | "status" | "action";
  sortable?: boolean;
  filterable?: boolean;
  width?: number;
  align?: "left" | "center" | "right";
  format?: string;
  render?: string; // Custom render function as string
}

// Dashboard Layout
export interface DashboardLayout {
  id: string;
  name: string;
  description?: string;

  // Grid Settings
  columns: number;
  rowHeight: number;
  margin: [number, number];

  // Responsive Breakpoints
  breakpoints: {
    lg: number;
    md: number;
    sm: number;
    xs: number;
  };

  // Column counts for different breakpoints
  cols: {
    lg: number;
    md: number;
    sm: number;
    xs: number;
  };

  // Widgets
  widgets: WidgetConfig[];

  // Theme
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    backgroundColor?: string;
    surfaceColor?: string;
    textColor?: string;
    borderColor?: string;
    borderRadius?: string;
    spacing?: string;
  };

  // Settings
  settings: {
    editable?: boolean;
    resizable?: boolean;
    draggable?: boolean;
    showGrid?: boolean;
    autoSave?: boolean;
    saveInterval?: number;
  };

  // Metadata
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  tags?: string[];
  public?: boolean;
  favorite?: boolean;
}

// Dashboard Context
export interface DashboardContextType {
  layout: DashboardLayout;
  widgets: WidgetConfig[];
  selectedWidget: string | null;
  editMode: boolean;

  // Actions
  addWidget: (widget: WidgetConfig) => void;
  updateWidget: (id: string, updates: Partial<WidgetConfig>) => void;
  deleteWidget: (id: string) => void;
  duplicateWidget: (id: string) => void;

  // Layout
  updateLayout: (layouts: any) => void;

  // Mode
  toggleEditMode: () => void;
  setSelectedWidget: (id: string | null) => void;

  // Data
  refreshWidget: (id: string) => void;
  refreshAll: () => void;

  // Save/Load
  saveDashboard: () => Promise<void>;
  loadDashboard: (id: string) => Promise<void>;
}

// Widget Template
export interface WidgetTemplate {
  type: WidgetType;
  name: string;
  description: string;
  icon: string;
  category: "analytics" | "content" | "productivity" | "custom";
  defaultConfig: Partial<WidgetConfig>;
  preview?: string; // Base64 image or URL

  // Requirements
  requiredData?: string[];
  supportedDataSources?: DataSource["type"][];

  // Customization
  configurableProps?: string[];
  styleProps?: string[];
}

// Pre-built Dashboard Templates
export interface DashboardTemplate {
  id: string;
  name: string;
  description: string;
  category: "business" | "sales" | "hr" | "finance" | "project" | "custom";
  layout: DashboardLayout;
  thumbnail?: string;
  requiredDataSources?: string[];
}

// Dashboard State
export interface DashboardState {
  layouts: Record<string, DashboardLayout>;
  currentLayoutId: string;
  editMode: boolean;
  selectedWidget: string | null;
  loading: boolean;
  error: string | null;

  // Widget Data Cache
  widgetData: Record<string, any>;

  // User Preferences
  preferences: {
    defaultLayout?: string;
    autoRefresh?: boolean;
    theme?: string;
    notifications?: boolean;
  };
}

// Default Dashboard Layout
export const defaultDashboardLayout: DashboardLayout = {
  id: "default",
  name: "Default Dashboard",
  description: "A default dashboard layout",
  columns: 12,
  rowHeight: 60,
  margin: [16, 16],
  breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480 },
  cols: { lg: 12, md: 10, sm: 6, xs: 4 },
  widgets: [],
  settings: {
    editable: true,
    resizable: true,
    draggable: true,
    showGrid: true,
    autoSave: true,
    saveInterval: 30,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  createdBy: "system",
  tags: [],
  public: false,
  favorite: false,
};

// Common Data Transformers
export const dataTransformers = {
  sum: (data: any[], field: string) =>
    data.reduce((sum, item) => sum + (Number(item[field]) || 0), 0),

  average: (data: any[], field: string) => {
    const sum = dataTransformers.sum(data, field);
    return data.length > 0 ? sum / data.length : 0;
  },

  count: (data: any[]) => data.length,

  groupBy: (data: any[], field: string) =>
    data.reduce((groups, item) => {
      const key = item[field];
      groups[key] = groups[key] || [];
      groups[key].push(item);
      return groups;
    }, {}),

  sortBy: (data: any[], field: string, order: "asc" | "desc" = "asc") =>
    [...data].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];
      return order === "asc" ? (aVal > bVal ? 1 : -1) : aVal < bVal ? 1 : -1;
    }),

  filter: (data: any[], condition: (item: any) => boolean) =>
    data.filter(condition),

  latest: (data: any[], count: number = 10) => data.slice(-count),
};
