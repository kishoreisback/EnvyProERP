import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/shared";
import { formatCurrency, formatDate } from "@/lib/formatters";
import {
  Target,
  Calendar,
  DollarSign,
  Users,
  Clock,
  TrendingUp,
  AlertTriangle,
  Plus,
} from "lucide-react";
import type { Milestone } from "./types";

interface MilestoneTrackerProps {
  milestones: Milestone[];
  showCosts?: boolean;
  onAddMilestone?: () => void;
  onEditMilestone?: (milestone: Milestone) => void;
  className?: string;
}

export function MilestoneTracker({
  milestones,
  showCosts = true,
  onAddMilestone,
  onEditMilestone,
  className = "",
}: MilestoneTrackerProps) {
  const getPhaseProgress = (phase: string) => {
    const phaseMilestones = milestones.filter((m) => m.phase === phase);
    if (phaseMilestones.length === 0) return 0;

    const totalProgress = phaseMilestones.reduce(
      (sum, m) => sum + m.progress,
      0,
    );
    return Math.round(totalProgress / phaseMilestones.length);
  };

  const getOverallProgress = () => {
    if (milestones.length === 0) return 0;
    const totalProgress = milestones.reduce((sum, m) => sum + m.progress, 0);
    return Math.round(totalProgress / milestones.length);
  };

  const getCriticalMilestones = () => {
    return milestones.filter(
      (m) => m.priority === "critical" || m.status === "delayed",
    );
  };

  const getUpcomingMilestones = () => {
    return milestones
      .filter((m) => m.status === "not-started" || m.status === "in-progress")
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      )
      .slice(0, 3);
  };

  const phases = [...new Set(milestones.map((m) => m.phase))];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Overall Progress Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Milestone Progress Overview
            </CardTitle>
            {onAddMilestone && (
              <Button onClick={onAddMilestone}>
                <Plus className="mr-2 h-4 w-4" />
                Add Milestone
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {getOverallProgress()}%
              </div>
              <div className="text-sm text-muted-foreground">
                Overall Progress
              </div>
              <Progress value={getOverallProgress()} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {milestones.filter((m) => m.status === "completed").length}
              </div>
              <div className="text-sm text-muted-foreground">
                Completed Milestones
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {getCriticalMilestones().length}
              </div>
              <div className="text-sm text-muted-foreground">
                Critical Items
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phase Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Phase Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {phases.map((phase) => (
              <div key={phase} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{phase}</span>
                  <span className="text-sm text-muted-foreground">
                    {getPhaseProgress(phase)}%
                  </span>
                </div>
                <Progress value={getPhaseProgress(phase)} />
                <div className="text-xs text-muted-foreground">
                  {milestones.filter((m) => m.phase === phase).length}{" "}
                  milestones
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Critical & Upcoming Milestones */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Critical Milestones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Critical Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getCriticalMilestones().length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No critical items
                </p>
              ) : (
                getCriticalMilestones().map((milestone) => (
                  <div
                    key={milestone.id}
                    className="p-3 border rounded-lg border-red-200 bg-red-50"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm">{milestone.name}</h4>
                      <div className="flex gap-1">
                        <StatusBadge status={milestone.status} />
                        <Badge variant="destructive">
                          {milestone.priority}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {milestone.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        Due: {formatDate(milestone.endDate)}
                      </span>
                      <span className="text-sm font-medium">
                        {milestone.progress}%
                      </span>
                    </div>
                    <Progress value={milestone.progress} className="mt-1" />
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Milestones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              Upcoming Milestones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getUpcomingMilestones().map((milestone) => (
                <div
                  key={milestone.id}
                  className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => onEditMilestone?.(milestone)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{milestone.name}</h4>
                    <StatusBadge status={milestone.status} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(milestone.startDate)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {milestone.assignedTeam}
                    </div>
                    {showCosts && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {formatCurrency(milestone.estimatedCost, {
                          compact: true,
                        })}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {milestone.progress}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Milestone List */}
      <Card>
        <CardHeader>
          <CardTitle>All Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {milestones.map((milestone) => (
              <div
                key={milestone.id}
                className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => onEditMilestone?.(milestone)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{milestone.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">{milestone.phase}</Badge>
                    <StatusBadge status={milestone.status} />
                    <Badge
                      variant={
                        milestone.priority === "critical"
                          ? "destructive"
                          : milestone.priority === "high"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {milestone.priority}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Timeline:</span>
                    <div>{formatDate(milestone.startDate)}</div>
                    <div>to {formatDate(milestone.endDate)}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Progress:</span>
                    <div className="flex items-center gap-2">
                      <Progress value={milestone.progress} className="flex-1" />
                      <span className="font-medium">{milestone.progress}%</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Team:</span>
                    <div>{milestone.assignedTeam}</div>
                  </div>
                  {showCosts && (
                    <div>
                      <span className="text-muted-foreground">Cost:</span>
                      <div>
                        {formatCurrency(milestone.estimatedCost, {
                          compact: true,
                        })}
                      </div>
                      {milestone.actualCost && (
                        <div className="text-xs">
                          Actual:{" "}
                          {formatCurrency(milestone.actualCost, {
                            compact: true,
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
