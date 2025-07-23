import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/shared";
import { formatDate } from "@/lib/formatters";
import {
  Calendar,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle,
  Eye,
  Edit,
} from "lucide-react";
import type { TimelineEvent } from "./types";

interface ProjectTimelineProps {
  events: TimelineEvent[];
  showActions?: boolean;
  onViewEvent?: (event: TimelineEvent) => void;
  onEditEvent?: (event: TimelineEvent) => void;
  className?: string;
}

export function ProjectTimeline({
  events,
  showActions = true,
  onViewEvent,
  onEditEvent,
  className = "",
}: ProjectTimelineProps) {
  const getEventIcon = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "milestone":
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case "delay":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "completion":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "issue":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "inspection":
        return <Eye className="h-4 w-4 text-purple-500" />;
      default:
        return <Calendar className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "milestone":
        return "bg-blue-100 text-blue-800";
      case "delay":
        return "bg-red-100 text-red-800";
      case "completion":
        return "bg-green-100 text-green-800";
      case "issue":
        return "bg-orange-100 text-orange-800";
      case "inspection":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Project Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedEvents.map((event, index) => (
            <div key={event.id} className="relative">
              {/* Timeline line */}
              {index < sortedEvents.length - 1 && (
                <div className="absolute left-4 top-8 w-0.5 h-16 bg-gray-200" />
              )}

              <div className="flex items-start gap-4">
                {/* Timeline dot */}
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-gray-200 mt-1">
                  {getEventIcon(event.type)}
                </div>

                {/* Event content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <Badge className={getTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                      <StatusBadge status={event.status} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {formatDate(event.date)}
                      </span>
                      {showActions && (
                        <div className="flex gap-1">
                          {onViewEvent && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onViewEvent(event)}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          )}
                          {onEditEvent && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onEditEvent(event)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-2">
                    {event.description}
                  </p>

                  {/* Event details */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {event.assignedTo && (
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {event.assignedTo}
                      </div>
                    )}
                    {event.duration && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.duration} days
                      </div>
                    )}
                    {event.dependencies && event.dependencies.length > 0 && (
                      <div className="flex items-center gap-1">
                        <span>Dependencies: {event.dependencies.length}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
