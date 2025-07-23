import React, { useState, useMemo, useCallback } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  Users,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Phone,
  Mail,
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  Target,
  Clock,
  MoreHorizontal,
  Star,
  Thermometer,
  Activity,
  Award,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { AnimatedIcon, PulsingDot } from "../../ui/animated-icons";
import { AnimatedCounter } from "../../ui/animated-counter";
import { useToast } from "../../ui/use-toast";
import {
  Lead,
  LeadSearchFilters,
  LeadStatus,
  LeadStage,
  LeadPriority,
} from "./types";
import { mockLeads, leadSources, leadAnalytics, salesTeam } from "./data";
import { CreateLead } from "./CreateLead";
import { LeadView } from "./LeadView";
import { EditLead } from "./EditLead";

export function LeadManagement() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<LeadSearchFilters>({});
  const { toast } = useToast();

  // Filter and search leads - simplified for performance
  const filteredLeads = useMemo(() => {
    if (!searchQuery && (!filters.status || filters.status.length === 0)) {
      return leads; // Return all leads if no filters
    }

    return leads.filter((lead) => {
      // Simple text search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const fullName = `${lead.firstName} ${lead.lastName}`.toLowerCase();
        if (
          !fullName.includes(query) &&
          !lead.email.toLowerCase().includes(query) &&
          !lead.phone.includes(query)
        ) {
          return false;
        }
      }

      // Status filter only (simplified)
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(lead.status)) return false;
      }

      return true;
    });
  }, [leads, searchQuery, filters.status]);

  const handleCreateLead = (leadData: any) => {
    const newLead: Lead = {
      id: `lead_${Date.now()}`,
      ...leadData,
      leadSource:
        leadSources.find((s) => s.id === leadData.leadSourceId) ||
        leadSources[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "current_user",
      activities: [],
      notes: [],
      documents: [],
      score: Math.floor(Math.random() * 100),
      temperature: "warm" as const,
      conversionProbability: Math.floor(Math.random() * 100),
      daysInPipeline: 0,
      followUpRequired: true,
    };

    setLeads((prev) => [newLead, ...prev]);
    setShowCreateDialog(false);
    toast({
      title: "Lead Created Successfully",
      description: `${newLead.firstName} ${newLead.lastName} has been added to your pipeline.`,
    });
  };

  const handleViewLead = useCallback((lead: Lead) => {
    setSelectedLead(lead);
    setShowViewDialog(true);
  }, []);

  const handleEditLead = useCallback((lead: Lead) => {
    setSelectedLead(lead);
    setShowEditDialog(true);
  }, []);

  const handleUpdateLead = (leadData: any) => {
    if (!selectedLead) return;

    const updatedLead = {
      ...selectedLead,
      ...leadData,
      leadSource:
        leadSources.find((s) => s.id === leadData.leadSourceId) ||
        selectedLead.leadSource,
      updatedAt: new Date().toISOString(),
    };

    setLeads((prev) =>
      prev.map((lead) => (lead.id === selectedLead.id ? updatedLead : lead)),
    );

    setShowEditDialog(false);
    setSelectedLead(null);
    toast({
      title: "Lead Updated Successfully",
      description: `${updatedLead.firstName} ${updatedLead.lastName} has been updated.`,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header with Analytics */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Lead Management</h1>
            <p className="text-muted-foreground">
              Manage your sales pipeline and track lead conversions
            </p>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
              <CreateLead
                onSubmit={handleCreateLead}
                onClose={() => setShowCreateDialog(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Analytics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <AnimatedCounter value={leadAnalytics.totalLeads} />
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  +12.5%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Conversion Rate
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <AnimatedCounter
                  value={leadAnalytics.conversionRate}
                  suffix="%"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  +2.3%
                </span>
                conversion improvement
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pipeline Value
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹
                <AnimatedCounter
                  value={leadAnalytics.totalPipelineValue / 100000}
                  suffix="L"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  +18.2%
                </span>
                pipeline growth
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Deal Size
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹
                <AnimatedCounter
                  value={leadAnalytics.averageDealValue / 100000}
                  suffix="L"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600 flex items-center gap-1">
                  <ArrowDownRight className="h-3 w-3" />
                  -5.1%
                </span>
                from last quarter
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter Leads
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name, email, phone, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            <Select
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  status: value ? [value as LeadStatus] : [],
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
                <SelectItem value="won">Won</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  priority: value ? [value as LeadPriority] : [],
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  leadSource: value ? [value] : [],
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Lead Source" />
              </SelectTrigger>
              <SelectContent>
                {leadSources.map((source) => (
                  <SelectItem key={source.id} value={source.id}>
                    {source.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  assignedTo: value ? [value] : [],
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Assigned To" />
              </SelectTrigger>
              <SelectContent>
                {salesTeam.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setFilters({});
              }}
            >
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Leads ({filteredLeads.length})</span>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Temperature</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => {
                const assignedUser = salesTeam.find(
                  (s) => s.id === lead.assignedTo,
                );
                const createdDate = new Date(
                  lead.createdAt,
                ).toLocaleDateString();

                return (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <div className="font-medium">
                        {lead.firstName} {lead.lastName}
                      </div>
                      {lead.designation && (
                        <div className="text-sm text-muted-foreground">
                          {lead.designation}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">{lead.email}</div>
                        <div className="text-sm">{lead.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {lead.company || "N/A"}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {lead.industry || "N/A"}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{lead.leadSource.name}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          lead.status === "new"
                            ? "bg-blue-100 text-blue-800"
                            : lead.status === "contacted"
                              ? "bg-yellow-100 text-yellow-800"
                              : lead.status === "qualified"
                                ? "bg-green-100 text-green-800"
                                : lead.status === "proposal"
                                  ? "bg-purple-100 text-purple-800"
                                  : lead.status === "won"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-gray-100 text-gray-800"
                        }
                      >
                        {lead.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="capitalize">{lead.priority}</span>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        ₹{lead.expectedValue?.toLocaleString() || 0}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="capitalize">{lead.temperature}</span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {assignedUser?.name || "Unassigned"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{createdDate}</div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleViewLead(lead)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEditLead(lead)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Lead
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Lead View Dialog */}
      <Dialog
        open={showViewDialog}
        onOpenChange={(open) => {
          if (!open) {
            setShowViewDialog(false);
            // Add a small delay to ensure dialog closes before clearing state
            setTimeout(() => setSelectedLead(null), 100);
          }
        }}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          {selectedLead && (
            <LeadView
              lead={selectedLead}
              onClose={() => {
                setShowViewDialog(false);
                setTimeout(() => setSelectedLead(null), 100);
              }}
              onEdit={() => {
                setShowViewDialog(false);
                setShowEditDialog(true);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Lead Edit Dialog */}
      <Dialog
        open={showEditDialog}
        onOpenChange={(open) => {
          if (!open) {
            setShowEditDialog(false);
            setTimeout(() => setSelectedLead(null), 100);
          }
        }}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          {selectedLead && (
            <EditLead
              lead={selectedLead}
              onSubmit={handleUpdateLead}
              onClose={() => {
                setShowEditDialog(false);
                setTimeout(() => setSelectedLead(null), 100);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
