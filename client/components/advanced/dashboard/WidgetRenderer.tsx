import React, { useState, useEffect } from "react";
import { WidgetConfig, DataSource } from "./types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";
import { Separator } from "../../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Minus,
  MoreHorizontal,
  Calendar,
  Clock,
  MapPin,
  AlertCircle,
  CheckCircle,
  XCircle,
  Settings,
  Maximize2,
} from "lucide-react";
import { cn } from "../../../lib/utils";
import {
  formatCurrency,
  formatNumber,
  formatDate,
} from "../../../lib/formatters";

interface WidgetRendererProps {
  widget: WidgetConfig;
  editMode?: boolean;
  onEdit?: (widget: WidgetConfig) => void;
  onDelete?: (id: string) => void;
  onRefresh?: (id: string) => void;
  className?: string;
}

export function WidgetRenderer({
  widget,
  editMode = false,
  onEdit,
  onDelete,
  onRefresh,
  className,
}: WidgetRendererProps) {
  const [data, setData] = useState(widget.data || widget.staticData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from data source
  useEffect(() => {
    if (widget.dataSource && widget.dataSource.type === "api") {
      fetchData();
    }
  }, [widget.dataSource]);

  // Auto refresh
  useEffect(() => {
    if (widget.autoRefresh && widget.refreshInterval) {
      const interval = setInterval(() => {
        fetchData();
      }, widget.refreshInterval * 1000);

      return () => clearInterval(interval);
    }
  }, [widget.autoRefresh, widget.refreshInterval]);

  const fetchData = async () => {
    if (!widget.dataSource) return;

    setLoading(true);
    setError(null);

    try {
      // Use mock data if available, otherwise fetch from API
      if (widget.dataSource.mockData) {
        setData(widget.dataSource.mockData);
      } else if (widget.dataSource.url) {
        const response = await fetch(widget.dataSource.url, {
          method: widget.dataSource.method || "GET",
          headers: widget.dataSource.headers,
          body: widget.dataSource.body
            ? JSON.stringify(widget.dataSource.body)
            : undefined,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        let responseData = await response.json();

        // Apply transformer if provided
        if (widget.dataSource.transformer) {
          try {
            const transformFn = new Function(
              "data",
              widget.dataSource.transformer,
            );
            responseData = transformFn(responseData);
          } catch (transformError) {
            console.warn("Data transformer error:", transformError);
          }
        }

        setData(responseData);
      }
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Failed to fetch data",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh(widget.id);
    } else {
      fetchData();
    }
  };

  const renderWidgetContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-32">
          <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-32 space-y-2">
          <AlertCircle className="h-6 w-6 text-destructive" />
          <p className="text-sm text-destructive">{error}</p>
          <Button size="sm" variant="outline" onClick={handleRefresh}>
            Retry
          </Button>
        </div>
      );
    }

    switch (widget.type) {
      case "metric":
        return renderMetricWidget();
      case "chart":
        return renderChartWidget();
      case "table":
        return renderTableWidget();
      case "list":
        return renderListWidget();
      case "progress":
        return renderProgressWidget();
      case "text":
        return renderTextWidget();
      case "calendar":
        return renderCalendarWidget();
      case "activity":
        return renderActivityWidget();
      case "notification":
        return renderNotificationWidget();
      case "clock":
        return renderClockWidget();
      case "weather":
        return renderWeatherWidget();
      default:
        return (
          <div className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">
              Widget type "{widget.type}" not implemented
            </p>
          </div>
        );
    }
  };

  const renderMetricWidget = () => {
    const value = data?.[widget.settings.value!] || data || 0;
    const target = widget.settings.target;
    const format = widget.settings.format || "number";
    const trend = widget.settings.trend;

    const formattedValue = formatValue(value, format);
    const percentage = target ? ((value / target) * 100).toFixed(1) : null;

    return (
      <div className="text-center space-y-2">
        <div className="text-3xl font-bold">{formattedValue}</div>
        {widget.settings.unit && (
          <div className="text-sm text-muted-foreground">
            {widget.settings.unit}
          </div>
        )}
        {percentage && (
          <div className="text-sm">
            <span className="text-muted-foreground">of</span>{" "}
            <span className="font-medium">{formatValue(target!, format)}</span>{" "}
            <span className="text-muted-foreground">({percentage}%)</span>
          </div>
        )}
        {trend && (
          <div className="flex items-center justify-center space-x-1">
            {trend === "up" && (
              <TrendingUp className="h-4 w-4 text-green-500" />
            )}
            {trend === "down" && (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            {trend === "neutral" && (
              <Minus className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="text-sm text-muted-foreground">
              {trend === "up"
                ? "Trending up"
                : trend === "down"
                  ? "Trending down"
                  : "Stable"}
            </span>
          </div>
        )}
      </div>
    );
  };

  const renderChartWidget = () => {
    // Simplified chart visualization using CSS
    const chartData = Array.isArray(data) ? data : [];

    return (
      <div className="space-y-4">
        {widget.settings.chartType === "bar" && (
          <div className="space-y-2">
            {chartData.slice(0, 5).map((item, index) => {
              const value = item[widget.settings.yAxis?.[0] || "value"] || 0;
              const maxValue = Math.max(
                ...chartData.map(
                  (d) => d[widget.settings.yAxis?.[0] || "value"] || 0,
                ),
              );
              const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;

              return (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-20 text-sm truncate">
                    {item[widget.settings.xAxis || "label"] ||
                      `Item ${index + 1}`}
                  </div>
                  <div className="flex-1">
                    <div className="h-4 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-16 text-sm text-right">
                    {formatValue(value, widget.settings.format || "number")}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {widget.settings.chartType === "pie" && (
          <div className="grid grid-cols-2 gap-2">
            {chartData.slice(0, 4).map((item, index) => {
              const value = item[widget.settings.yAxis?.[0] || "value"] || 0;
              const total = chartData.reduce(
                (sum, d) =>
                  sum + (d[widget.settings.yAxis?.[0] || "value"] || 0),
                0,
              );
              const percentage =
                total > 0 ? ((value / total) * 100).toFixed(1) : "0";

              return (
                <div key={index} className="text-center space-y-1">
                  <div className="w-12 h-12 mx-auto rounded-full border-4 border-primary/20 border-t-primary" />
                  <div className="text-xs font-medium">
                    {item[widget.settings.xAxis || "label"] ||
                      `Item ${index + 1}`}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {percentage}%
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {(!widget.settings.chartType ||
          widget.settings.chartType === "line") && (
          <div className="h-32 flex items-end space-x-1">
            {chartData.slice(0, 10).map((item, index) => {
              const value = item[widget.settings.yAxis?.[0] || "value"] || 0;
              const maxValue = Math.max(
                ...chartData.map(
                  (d) => d[widget.settings.yAxis?.[0] || "value"] || 0,
                ),
              );
              const height = maxValue > 0 ? (value / maxValue) * 100 : 0;

              return (
                <div key={index} className="flex-1 flex flex-col justify-end">
                  <div
                    className="bg-primary rounded-t transition-all duration-300"
                    style={{ height: `${height}%`, minHeight: "2px" }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderTableWidget = () => {
    const tableData = Array.isArray(data) ? data : [];
    const columns = widget.settings.columns || [];

    return (
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={cn(column.align && `text-${column.align}`)}
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData
              .slice(0, widget.settings.pageSize || 5)
              .map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      className={cn(column.align && `text-${column.align}`)}
                    >
                      {formatTableCell(row[column.key], column.type)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  const renderListWidget = () => {
    const listData = Array.isArray(data) ? data : [];

    return (
      <div className="space-y-2">
        {listData.slice(0, 5).map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-2 hover:bg-muted/50 rounded"
          >
            {widget.settings.showAvatar && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={item.avatar} />
                <AvatarFallback>{item.name?.[0] || "?"}</AvatarFallback>
              </Avatar>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">
                {item.title || item.name}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {item.description || item.email}
              </div>
            </div>
            {widget.settings.showTimestamp && item.timestamp && (
              <div className="text-xs text-muted-foreground">
                {formatDate(item.timestamp, "relative")}
              </div>
            )}
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </div>
        ))}
      </div>
    );
  };

  const renderProgressWidget = () => {
    const value = widget.settings.progressValue || 0;
    const max = widget.settings.progressMax || 100;
    const percentage = (value / max) * 100;

    return (
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm text-muted-foreground">of {max}</div>
        </div>

        {widget.settings.progressType === "circular" ? (
          <div className="relative w-24 h-24 mx-auto">
            <svg
              className="w-24 h-24 transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-muted"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeLinecap="round"
                className="text-primary"
                strokeDasharray={`${percentage * 2.51} ${(100 - percentage) * 2.51}`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-medium">
                {percentage.toFixed(0)}%
              </span>
            </div>
          </div>
        ) : (
          <Progress value={percentage} className="h-4" />
        )}
      </div>
    );
  };

  const renderTextWidget = () => {
    const content = widget.settings.content || "No content";

    return (
      <div className="prose prose-sm max-w-none">
        {widget.settings.markdown ? (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        ) : (
          <p>{content}</p>
        )}
      </div>
    );
  };

  const renderCalendarWidget = () => {
    const events = Array.isArray(data) ? data : [];
    const today = new Date();

    return (
      <div className="space-y-2">
        <div className="text-center text-sm font-medium">
          {today.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </div>
        <Separator />
        <div className="space-y-2">
          {events.slice(0, 3).map((event, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">
                  {event.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatDate(event.date, "short")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderActivityWidget = () => {
    const activities = Array.isArray(data) ? data : [];

    return (
      <div className="space-y-3">
        {activities.slice(0, 4).map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              {activity.type === "success" && (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
              {activity.type === "error" && (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              {activity.type === "warning" && (
                <AlertCircle className="h-4 w-4 text-yellow-500" />
              )}
              {!activity.type && (
                <div className="w-2 h-2 bg-primary rounded-full mt-1" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm">{activity.message}</div>
              <div className="text-xs text-muted-foreground">
                {formatDate(activity.timestamp, "relative")}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderNotificationWidget = () => {
    const notifications = Array.isArray(data) ? data : [];
    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Notifications</span>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {unreadCount}
            </Badge>
          )}
        </div>
        <div className="space-y-2">
          {notifications.slice(0, 3).map((notification, index) => (
            <div
              key={index}
              className={cn(
                "p-2 rounded border-l-2",
                notification.priority === "high"
                  ? "border-l-red-500 bg-red-50"
                  : notification.priority === "medium"
                    ? "border-l-yellow-500 bg-yellow-50"
                    : "border-l-blue-500 bg-blue-50",
                !notification.read && "font-medium",
              )}
            >
              <div className="text-sm">{notification.title}</div>
              <div className="text-xs text-muted-foreground">
                {formatDate(notification.timestamp, "relative")}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderClockWidget = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
      const timer = setInterval(() => setCurrentTime(new Date()), 1000);
      return () => clearInterval(timer);
    }, []);

    return (
      <div className="text-center space-y-2">
        <Clock className="h-8 w-8 mx-auto text-muted-foreground" />
        <div className="text-2xl font-bold font-mono">
          {currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
        <div className="text-sm text-muted-foreground">
          {currentTime.toLocaleDateString([], {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>
    );
  };

  const renderWeatherWidget = () => {
    const weather = data || {};

    return (
      <div className="text-center space-y-2">
        <MapPin className="h-6 w-6 mx-auto text-muted-foreground" />
        <div className="text-lg font-semibold">
          {weather.location || "Mumbai"}
        </div>
        <div className="text-3xl font-bold">
          {weather.temperature || "28"}°C
        </div>
        <div className="text-sm text-muted-foreground">
          {weather.condition || "Partly Cloudy"}
        </div>
        <div className="text-xs text-muted-foreground">
          Humidity: {weather.humidity || "65"}%
        </div>
      </div>
    );
  };

  const formatValue = (value: any, format: string) => {
    switch (format) {
      case "currency":
        return formatCurrency(value);
      case "percentage":
        return `${value}%`;
      case "duration":
        return `${value}h`;
      default:
        return formatNumber(value);
    }
  };

  const formatTableCell = (value: any, type?: string) => {
    switch (type) {
      case "currency":
        return formatCurrency(value);
      case "date":
        return formatDate(value, "short");
      case "status":
        return <Badge variant="outline">{value}</Badge>;
      default:
        return value;
    }
  };

  return (
    <Card
      className={cn(
        "h-full relative group",
        editMode && "border-dashed",
        className,
      )}
      style={{
        backgroundColor: widget.settings.backgroundColor,
        color: widget.settings.textColor,
      }}
    >
      {widget.settings.showHeader !== false && (
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-medium">
                {widget.title}
              </CardTitle>
              {widget.description && (
                <CardDescription className="text-xs">
                  {widget.description}
                </CardDescription>
              )}
            </div>
            <div className="flex items-center space-x-1">
              {widget.autoRefresh && (
                <Button size="sm" variant="ghost" onClick={handleRefresh}>
                  <RefreshCw className="h-3 w-3" />
                </Button>
              )}
              {editMode && (
                <>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onEdit?.(widget)}
                  >
                    <Settings className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete?.(widget.id)}
                  >
                    <XCircle className="h-3 w-3" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
      )}

      <CardContent className={cn("p-4", !widget.settings.showHeader && "pt-4")}>
        {renderWidgetContent()}
      </CardContent>

      {widget.lastUpdated && (
        <div className="absolute bottom-1 right-1 text-xs text-muted-foreground">
          {formatDate(widget.lastUpdated, "relative")}
        </div>
      )}
    </Card>
  );
}
