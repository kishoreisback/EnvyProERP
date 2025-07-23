import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Progress } from "../../ui/progress";
import { Switch } from "../../ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  Clock,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowUp,
  Settings,
  Play,
  Pause,
  RefreshCw,
  Eye,
  Plus,
  UserPlus,
  Timer,
  Target,
  Activity,
} from "lucide-react";
import {
  AssignmentQueue,
  UnassignedLead,
  QueueMember,
  AssignmentRule,
} from "./enhanced-types";
import {
  getAssignmentQueuesByTenant,
  getUnassignedLeadsByTenant,
} from "./enhanced-data";
import { useToast } from "../../ui/use-toast";

interface AssignmentQueueManagerProps {
  tenantId: string;
  onLeadAssigned?: (leadId: string, userId: string) => void;
}

export function AssignmentQueueManager({
  tenantId,
  onLeadAssigned,
}: AssignmentQueueManagerProps) {
  const [queues, setQueues] = useState<AssignmentQueue[]>([]);
  const [unassignedLeads, setUnassignedLeads] = useState<UnassignedLead[]>([]);
  const [selectedQueue, setSelectedQueue] = useState<AssignmentQueue | null>(
    null,
  );
  const [showQueueDialog, setShowQueueDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [selectedLead, setSelectedLead] = useState<UnassignedLead | null>(null);
  const [autoAssignmentEnabled, setAutoAssignmentEnabled] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadQueueData();
    const interval = setInterval(loadQueueData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [tenantId]);

  const loadQueueData = () => {
    const queueData = getAssignmentQueuesByTenant(tenantId);
    const unassignedData = getUnassignedLeadsByTenant(tenantId);

    setQueues(queueData);
    setUnassignedLeads(unassignedData);
  };

  const handleManualAssignment = async (leadId: string, userId: string) => {
    try {
      // Simulate manual assignment
      const updatedLeads = unassignedLeads.map((lead) =>
        lead.leadId === leadId
          ? {
              ...lead,
              currentAssignee: userId,
              assignedAt: new Date().toISOString(),
              status: "assigned" as const,
            }
          : lead,
      );

      setUnassignedLeads(updatedLeads.filter((lead) => lead.leadId !== leadId));

      // Update queue member counts
      const updatedQueues = queues.map((queue) => ({
        ...queue,
        members: queue.members.map((member) =>
          member.userId === userId
            ? { ...member, currentLeadCount: member.currentLeadCount + 1 }
            : member,
        ),
        stats: {
          ...queue.stats,
          unassignedLeads: queue.stats.unassignedLeads - 1,
          assignedLeads: queue.stats.assignedLeads + 1,
          todayAssigned: queue.stats.todayAssigned + 1,
        },
      }));

      setQueues(updatedQueues);

      toast({
        title: "Lead Assigned",
        description: `Lead successfully assigned to team member.`,
      });

      onLeadAssigned?.(leadId, userId);
      setShowAssignDialog(false);
    } catch (error) {
      toast({
        title: "Assignment Failed",
        description: "Failed to assign lead. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEscalateLead = async (leadId: string) => {
    try {
      const updatedLeads = unassignedLeads.map((lead) =>
        lead.leadId === leadId
          ? {
              ...lead,
              escalationLevel: lead.escalationLevel + 1,
              status: "escalated" as const,
              escalatedAt: new Date().toISOString(),
              escalationReason: "Manual escalation requested",
            }
          : lead,
      );

      setUnassignedLeads(updatedLeads);

      toast({
        title: "Lead Escalated",
        description: "Lead has been escalated to the next level.",
      });
    } catch (error) {
      toast({
        title: "Escalation Failed",
        description: "Failed to escalate lead. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleQueueStatus = async (queueId: string) => {
    try {
      const updatedQueues = queues.map((queue) =>
        queue.id === queueId ? { ...queue, isActive: !queue.isActive } : queue,
      );

      setQueues(updatedQueues);

      const queue = updatedQueues.find((q) => q.id === queueId);
      toast({
        title: queue?.isActive ? "Queue Activated" : "Queue Deactivated",
        description: `Assignment queue has been ${queue?.isActive ? "activated" : "deactivated"}.`,
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update queue status.",
        variant: "destructive",
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "assigned":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "escalated":
        return <ArrowUp className="h-4 w-4 text-red-600" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "queued":
      case "assigning":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getOverdueLeads = () => {
    const now = new Date();
    return unassignedLeads.filter((lead) => {
      if (!lead.responseDeadline) return false;
      return new Date(lead.responseDeadline) < now;
    });
  };

  const getMemberUtilization = (member: QueueMember) => {
    return Math.round(
      (member.currentLeadCount / member.maxConcurrentLeads) * 100,
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Assignment Queue Manager</h2>
          <p className="text-muted-foreground">
            Manage lead assignment queues and team workload
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-2">
            <Switch
              checked={autoAssignmentEnabled}
              onCheckedChange={setAutoAssignmentEnabled}
            />
            <Label>Auto-assignment</Label>
          </div>
          <Button variant="outline" onClick={() => setShowQueueDialog(true)}>
            <Settings className="mr-2 h-4 w-4" />
            Configure
          </Button>
          <Button onClick={loadQueueData}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unassigned Leads
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unassignedLeads.length}</div>
            <p className="text-xs text-muted-foreground">
              {getOverdueLeads().length} overdue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Queues</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {queues.filter((q) => q.isActive).length}
            </div>
            <p className="text-xs text-muted-foreground">
              {queues.length} total queues
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {queues.reduce((total, queue) => total + queue.members.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Available for assignment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Response Time
            </CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {queues.length > 0
                ? Math.round(
                    queues.reduce(
                      (sum, q) => sum + q.stats.averageResponseTime,
                      0,
                    ) / queues.length,
                  )
                : 0}
              m
            </div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Assignments
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {queues.reduce(
                (total, queue) => total + queue.stats.todayAssigned,
                0,
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {queues.reduce(
                (total, queue) => total + queue.stats.todayEscalated,
                0,
              )}{" "}
              escalated
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="unassigned" className="space-y-4">
        <TabsList>
          <TabsTrigger value="unassigned">Unassigned Leads</TabsTrigger>
          <TabsTrigger value="queues">Assignment Queues</TabsTrigger>
          <TabsTrigger value="team">Team Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="unassigned" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Unassigned Leads Queue</CardTitle>
              <CardDescription>
                Leads waiting for assignment to team members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lead</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Queue Position</TableHead>
                    <TableHead>Wait Time</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Territory</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {unassignedLeads.map((lead) => (
                    <TableRow key={lead.leadId}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{lead.leadInfo.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {lead.leadInfo.company || "—"}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(lead.priority)}>
                          {lead.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>#{lead.queuePosition}</TableCell>
                      <TableCell>
                        {Math.round(
                          (new Date().getTime() -
                            new Date(lead.enteredQueueAt).getTime()) /
                            (1000 * 60),
                        )}
                        m
                      </TableCell>
                      <TableCell>
                        ₹{((lead.leadInfo.value || 0) / 100000).toFixed(1)}L
                      </TableCell>
                      <TableCell>{lead.leadInfo.territory}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(lead.status)}
                          <span className="capitalize">{lead.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedLead(lead);
                              setShowAssignDialog(true);
                            }}
                          >
                            Assign
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEscalateLead(lead.leadId)}
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {unassignedLeads.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No unassigned leads in the queue.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="queues" className="space-y-4">
          <div className="grid gap-4">
            {queues.map((queue) => (
              <Card key={queue.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {queue.name}
                        <Badge
                          variant={queue.isActive ? "default" : "secondary"}
                        >
                          {queue.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{queue.description}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleQueueStatus(queue.id)}
                      >
                        {queue.isActive ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedQueue(queue);
                          setShowQueueDialog(true);
                        }}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {queue.stats.unassignedLeads}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Unassigned
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {queue.stats.assignedLeads}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Assigned
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {queue.stats.averageAssignmentTime}m
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Avg Assignment
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {queue.stats.todayAssigned}
                      </div>
                      <div className="text-sm text-muted-foreground">Today</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Team Members</h4>
                    <div className="grid gap-2">
                      {queue.members.map((member) => (
                        <div
                          key={member.userId}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                member.isAvailable
                                  ? "bg-green-400"
                                  : "bg-red-400"
                              }`}
                            />
                            <div>
                              <p className="font-medium">{member.userName}</p>
                              <p className="text-sm text-muted-foreground">
                                {member.role}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-center">
                              <div className="text-sm font-medium">
                                {member.currentLeadCount}/
                                {member.maxConcurrentLeads}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Capacity
                              </div>
                            </div>
                            <div className="w-16">
                              <Progress value={getMemberUtilization(member)} />
                              <div className="text-xs text-center mt-1">
                                {getMemberUtilization(member)}%
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm font-medium">
                                {member.conversionRate}%
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Conversion
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
              <CardDescription>
                Individual performance metrics for team members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team Member</TableHead>
                    <TableHead>Current Load</TableHead>
                    <TableHead>Avg Response Time</TableHead>
                    <TableHead>Conversion Rate</TableHead>
                    <TableHead>Satisfaction</TableHead>
                    <TableHead>Availability</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {queues
                    .flatMap((queue) => queue.members)
                    .map((member) => (
                      <TableRow key={member.userId}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{member.userName}</p>
                            <p className="text-sm text-muted-foreground">
                              {member.role}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="text-sm">
                              {member.currentLeadCount}/
                              {member.maxConcurrentLeads}
                            </div>
                            <Progress
                              value={getMemberUtilization(member)}
                              className="w-16"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          {member.averageResponseTime.toFixed(1)}h
                        </TableCell>
                        <TableCell>{member.conversionRate}%</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <span>{member.satisfaction.toFixed(1)}</span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <div
                                  key={star}
                                  className={`w-3 h-3 ${
                                    star <= member.satisfaction
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                >
                                  ★
                                </div>
                              ))}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              member.isAvailable ? "default" : "secondary"
                            }
                          >
                            {member.isAvailable ? "Available" : "Busy"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Manual Assignment Dialog */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Assign Lead</DialogTitle>
            <DialogDescription>
              Manually assign {selectedLead?.leadInfo.name} to a team member
            </DialogDescription>
          </DialogHeader>

          {selectedLead && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Lead Details</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Name: {selectedLead.leadInfo.name}</div>
                  <div>Company: {selectedLead.leadInfo.company || "—"}</div>
                  <div>
                    Value: ₹
                    {((selectedLead.leadInfo.value || 0) / 100000).toFixed(1)}L
                  </div>
                  <div>Territory: {selectedLead.leadInfo.territory}</div>
                  <div>
                    Wait Time:{" "}
                    {Math.round(
                      (new Date().getTime() -
                        new Date(selectedLead.enteredQueueAt).getTime()) /
                        (1000 * 60),
                    )}
                    m
                  </div>
                  <div>
                    Priority:
                    <Badge
                      className={`ml-1 ${getPriorityColor(selectedLead.priority)}`}
                    >
                      {selectedLead.priority}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <Label>Available Team Members</Label>
                <div className="space-y-2 mt-2 max-h-60 overflow-y-auto">
                  {queues
                    .find((q) => q.id === selectedLead.queueId)
                    ?.members.filter(
                      (member) =>
                        member.isAvailable &&
                        member.currentLeadCount < member.maxConcurrentLeads,
                    )
                    .map((member) => (
                      <div
                        key={member.userId}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer"
                        onClick={() =>
                          handleManualAssignment(
                            selectedLead.leadId,
                            member.userId,
                          )
                        }
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 rounded-full bg-green-400" />
                          <div>
                            <p className="font-medium">{member.userName}</p>
                            <p className="text-sm text-muted-foreground">
                              {member.role}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">
                            {member.currentLeadCount}/
                            {member.maxConcurrentLeads} leads
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {member.conversionRate}% conversion
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAssignDialog(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Queue Configuration Dialog */}
      <Dialog open={showQueueDialog} onOpenChange={setShowQueueDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Queue Configuration</DialogTitle>
            <DialogDescription>
              Configure assignment queue settings and rules
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Queue Name</Label>
                <Input
                  value={selectedQueue?.name || ""}
                  placeholder="Enter queue name"
                />
              </div>
              <div>
                <Label>Assignment Type</Label>
                <Select value={selectedQueue?.type || "round_robin"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="round_robin">Round Robin</SelectItem>
                    <SelectItem value="load_balanced">Load Balanced</SelectItem>
                    <SelectItem value="skill_based">Skill Based</SelectItem>
                    <SelectItem value="territory_based">
                      Territory Based
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Assignment Timeout (hours)</Label>
                <Input
                  type="number"
                  value={selectedQueue?.assignmentTimeout || 4}
                  min="1"
                  max="24"
                />
              </div>
              <div>
                <Label>Escalation Timeout (hours)</Label>
                <Input
                  type="number"
                  value={selectedQueue?.escalationTimeout || 24}
                  min="1"
                  max="72"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch checked={selectedQueue?.autoAssignment || false} />
              <Label>Enable auto-assignment</Label>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={selectedQueue?.description || ""}
                placeholder="Enter queue description"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowQueueDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowQueueDialog(false)}>
              Save Configuration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
