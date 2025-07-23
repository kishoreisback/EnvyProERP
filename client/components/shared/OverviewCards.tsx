import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

export interface MetricCard {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: "default" | "primary" | "success" | "warning" | "destructive";
}

interface OverviewCardsProps {
  metrics: MetricCard[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function OverviewCards({
  metrics,
  columns = 4,
  className = "",
}: OverviewCardsProps) {
  const getGridClass = () => {
    switch (columns) {
      case 2:
        return "md:grid-cols-2";
      case 3:
        return "md:grid-cols-3";
      case 4:
        return "md:grid-cols-2 lg:grid-cols-4";
      default:
        return "md:grid-cols-2 lg:grid-cols-4";
    }
  };

  const getIconColor = (color: MetricCard["color"]) => {
    switch (color) {
      case "primary":
        return "text-primary";
      case "success":
        return "text-green-500";
      case "warning":
        return "text-yellow-500";
      case "destructive":
        return "text-red-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getTrendColor = (isPositive: boolean) => {
    return isPositive ? "text-green-600" : "text-red-600";
  };

  return (
    <div className={`grid gap-4 ${getGridClass()} ${className}`}>
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            <metric.icon className={`h-4 w-4 ${getIconColor(metric.color)}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            {metric.subtitle && (
              <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
            )}
            {metric.trend && (
              <p
                className={`text-xs ${getTrendColor(metric.trend.isPositive)} flex items-center mt-1`}
              >
                {metric.trend.value}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
