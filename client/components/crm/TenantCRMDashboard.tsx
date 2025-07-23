import React, { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Plus,
  Filter,
  Settings,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Phone,
  Mail,
  MessageSquare,
  TrendingUp,
  BarChart3,
  Target,
  DollarSign,
  Calendar,
  MapPin,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
  FileText,
  Download,
  Users,
  Building2,
  Activity,
  User,
  UserCheck,
  Send,
  Upload,
  Search,
  ArrowRight,
  Copy,
  Clock,
  Shield,
} from "lucide-react";
import { AnimatedCounter } from "../ui/animated-counter";
import {
  usePermissions,
  ProtectedComponent,
} from "../user-management/PermissionProvider";
import {
  TenantLead,
  TenantLeadSource,
  TenantLeadAnalytics,
  LeadStatus,
  LeadStage,
  LeadPriority,
  TenantLeadSearchFilters,
} from "./lead/types";
import {
  getTenantLeads,
  getTenantLeadSources,
  getTenantLeadAnalytics,
  filterTenantLeads,
  getLeadsByStatus,
  getLeadsByStage,
} from "./lead/data";
import { availableTenants } from "./constants";
import { LeadConversionManager } from "./lead/LeadConversionManager";
import { AssignmentQueueManager } from "./lead/AssignmentQueueManager";
import { DuplicateDetectionManager } from "./lead/DuplicateDetectionManager";
import { useToast } from "../ui/use-toast";

interface TenantCRMDashboardProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export function TenantCRMDashboard({
  currentTab = "overview",
  onTabChange,
}: TenantCRMDashboardProps) {
  const { user: currentUser, hasPermission, isTenantAdmin } = usePermissions();
  const { toast } = useToast();

  // State management
  const [selectedTenantId, setSelectedTenantId] = useState(
    currentUser?.tenantId || "tenant_001",
  );
  const [activeTab, setActiveTab] = useState(currentTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterStage, setFilterStage] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterAssignee, setFilterAssignee] = useState<string>("all");
  const [filterTerritory, setFilterTerritory] = useState<string>("all");

  // Modal states
  const [selectedLead, setSelectedLead] = useState<TenantLead | null>(null);
  const [selectedSource, setSelectedSource] = useState<TenantLeadSource | null>(
    null,
  );
  const [modals, setModals] = useState({
    createLead: false,
    editLead: false,
    viewLead: false,
    createSource: false,
    editSource: false,
    createDeal: false,
    sendCommunication: false,
    sendMessage: false,
    createTemplate: false,
    importLeads: false,
    exportLeads: false,
    exportAnalytics: false,
    leadAnalytics: false,
    settings: false,
  });

  // Get tenant-specific data
  const leads = getTenantLeads(selectedTenantId);
  const leadSources = getTenantLeadSources(selectedTenantId);
  const analytics = getTenantLeadAnalytics(selectedTenantId);
  const currentTenant = availableTenants.find((t) => t.id === selectedTenantId);

  // Sync activeTab with currentTab prop
  useEffect(() => {
    setActiveTab(currentTab);
  }, [currentTab]);

  // Handle tab changes
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    onTabChange?.(newTab);
  };

  // Handle tenant switching
  const handleTenantSwitch = (tenantId: string) => {
    setSelectedTenantId(tenantId);
    setSearchQuery("");
    setFilterStatus("all");
    setFilterStage("all");
    setFilterPriority("all");
    setFilterAssignee("all");
    setFilterTerritory("all");
    setSelectedLead(null);
    setSelectedSource(null);
  };

  // Filter leads based on search and filters
  const filteredLeads = useMemo(() => {
    const filters: TenantLeadSearchFilters = {};

    if (searchQuery) filters.query = searchQuery;
    if (filterStatus !== "all") filters.status = [filterStatus as LeadStatus];
    if (filterStage !== "all") filters.stage = [filterStage as LeadStage];
    if (filterPriority !== "all")
      filters.priority = [filterPriority as LeadPriority];
    if (filterAssignee !== "all") filters.assignedTo = [filterAssignee];
    if (filterTerritory !== "all") filters.territory = [filterTerritory];

    return filterTenantLeads(selectedTenantId, filters);
  }, [
    selectedTenantId,
    searchQuery,
    filterStatus,
    filterStage,
    filterPriority,
    filterAssignee,
    filterTerritory,
  ]);

  // Get lead statistics
  const leadStats = useMemo(() => {
    const total = leads.length;
    const newLeads = leads.filter((l) => l.status === "new").length;
    const qualified = leads.filter((l) => l.status === "qualified").length;
    const proposal = leads.filter((l) => l.status === "proposal").length;
    const won = leads.filter((l) => l.status === "won").length;
    const lost = leads.filter((l) => l.status === "lost").length;

    const totalValue = leads.reduce(
      (sum, l) => sum + (l.expectedValue || 0),
      0,
    );
    const wonValue = leads
      .filter((l) => l.status === "won")
      .reduce((sum, l) => sum + (l.expectedValue || 0), 0);
    const pipelineValue = leads
      .filter((l) => !["won", "lost"].includes(l.status))
      .reduce((sum, l) => sum + (l.expectedValue || 0), 0);

    const conversionRate = total > 0 ? Math.round((won / total) * 100) : 0;
    const avgDealSize = won > 0 ? wonValue / won : 0;

    return {
      total,
      newLeads,
      qualified,
      proposal,
      won,
      lost,
      totalValue,
      wonValue,
      pipelineValue,
      conversionRate,
      avgDealSize,
    };
  }, [leads]);

  // Helper functions
  const getPriorityColor = (priority: LeadPriority) => {
    const colors = {
      low: "bg-gray-100 text-gray-800",
      medium: "bg-blue-100 text-blue-800",
      high: "bg-orange-100 text-orange-800",
      urgent: "bg-red-100 text-red-800",
    };
    return colors[priority] || colors.medium;
  };

  const getStatusColor = (status: LeadStatus) => {
    const colors = {
      new: "bg-blue-100 text-blue-800",
      contacted: "bg-yellow-100 text-yellow-800",
      qualified: "bg-green-100 text-green-800",
      proposal: "bg-purple-100 text-purple-800",
      negotiation: "bg-orange-100 text-orange-800",
      won: "bg-green-200 text-green-900",
      lost: "bg-red-100 text-red-800",
      nurturing: "bg-indigo-100 text-indigo-800",
      on_hold: "bg-gray-100 text-gray-800",
    };
    return colors[status] || colors.new;
  };

  const getStageColor = (stage: LeadStage) => {
    const colors = {
      prospect: "bg-gray-100 text-gray-800",
      lead: "bg-blue-100 text-blue-800",
      opportunity: "bg-yellow-100 text-yellow-800",
      proposal: "bg-purple-100 text-purple-800",
      negotiation: "bg-orange-100 text-orange-800",
      closed_won: "bg-green-200 text-green-900",
      closed_lost: "bg-red-100 text-red-800",
    };
    return colors[stage] || colors.prospect;
  };

  // Action handlers
  const handleLeadAction = (action: string, lead: TenantLead) => {
    switch (action) {
      case "view":
        setSelectedLead(lead);
        setModals((prev) => ({ ...prev, viewLead: true }));
        break;
      case "edit":
        setSelectedLead(lead);
        setModals((prev) => ({ ...prev, editLead: true }));
        break;
      case "contact":
        setSelectedLead(lead);
        setModals((prev) => ({ ...prev, sendCommunication: true }));
        break;
      case "delete":
        if (window.confirm("Are you sure you want to delete this lead?")) {
          // TODO: Implement lead deletion
        }
        break;
    }
  };

  const handleSourceAction = (action: string, source: TenantLeadSource) => {
    switch (action) {
      case "edit":
        setSelectedSource(source);
        setModals((prev) => ({ ...prev, editSource: true }));
        break;
      case "toggle":
        // TODO: Implement source toggle functionality
        break;
      case "delete":
        if (
          window.confirm("Are you sure you want to delete this lead source?")
        ) {
          // TODO: Implement source deletion
        }
        break;
    }
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
    if (modalName === "viewLead" || modalName === "editLead")
      setSelectedLead(null);
    if (modalName === "editSource") setSelectedSource(null);
  };

  // Get territories for the current tenant
  const territories = useMemo(() => {
    const territorySet = new Set(leads.map((l) => l.territory).filter(Boolean));
    return Array.from(territorySet);
  }, [leads]);

  // Get assignees for the current tenant
  const assignees = useMemo(() => {
    const assigneeSet = new Set(leads.map((l) => l.assignedTo).filter(Boolean));
    return Array.from(assigneeSet);
  }, [leads]);

  return (
    <div className="space-y-6">
      {/* Header with Tenant Switching */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold">CRM Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Tenant-driven customer relationship management
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="gap-1">
              <Building2 className="h-3 w-3" />
              {currentTenant?.name}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {currentTenant?.type}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {leads.length} Leads
            </Badge>
            <Badge variant="outline" className="text-xs">
              {leadSources.length} Sources
            </Badge>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Label htmlFor="tenant-select" className="text-sm font-medium">
              Switch Tenant:
            </Label>
            <Select value={selectedTenantId} onValueChange={handleTenantSwitch}>
              <SelectTrigger id="tenant-select" className="w-[280px]">
                <SelectValue placeholder="Select tenant" />
              </SelectTrigger>
              <SelectContent>
                {availableTenants.map((tenant) => (
                  <SelectItem key={tenant.id} value={tenant.id}>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <span>{tenant.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {tenant.type}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Activity className="h-3 w-3" />
            Tenant CRM
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setModals((prev) => ({ ...prev, settings: true }))}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-9">
          <TabsTrigger
            value="overview"
            className="flex items-center gap-2 text-xs"
          >
            <BarChart3 className="h-3 w-3" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="leads"
            className="flex items-center gap-2 text-xs"
          >
            <Users className="h-3 w-3" />
            Leads
          </TabsTrigger>
          <TabsTrigger
            value="sources"
            className="flex items-center gap-2 text-xs"
          >
            <Target className="h-3 w-3" />
            Sources
          </TabsTrigger>
          <TabsTrigger
            value="communication"
            className="flex items-center gap-2 text-xs"
          >
            <MessageSquare className="h-3 w-3" />
            Comm
          </TabsTrigger>
          <TabsTrigger
            value="pipeline"
            className="flex items-center gap-2 text-xs"
          >
            <TrendingUp className="h-3 w-3" />
            Pipeline
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="flex items-center gap-2 text-xs"
          >
            <Activity className="h-3 w-3" />
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="conversion"
            className="flex items-center gap-2 text-xs"
          >
            <ArrowRight className="h-3 w-3" />
            Convert
          </TabsTrigger>
          <TabsTrigger
            value="assignment"
            className="flex items-center gap-2 text-xs"
          >
            <Clock className="h-3 w-3" />
            Queue
          </TabsTrigger>
          <TabsTrigger
            value="duplicates"
            className="flex items-center gap-2 text-xs"
          >
            <Copy className="h-3 w-3" />
            Duplicates
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Leads
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <AnimatedCounter value={leadStats.total} />
                </div>
                <p className="text-xs text-muted-foreground">
                  {leadStats.newLeads} new this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Conversion Rate
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <AnimatedCounter value={leadStats.conversionRate} />%
                </div>
                <p className="text-xs text-muted-foreground">
                  {leadStats.won} deals won
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
                  ₹{(leadStats.pipelineValue / 1000000).toFixed(1)}M
                </div>
                <p className="text-xs text-muted-foreground">
                  Active opportunities
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg Deal Size
                </CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{(leadStats.avgDealSize / 100000).toFixed(1)}L
                </div>
                <p className="text-xs text-muted-foreground">Per deal value</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions and Recent Activity */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Leads</CardTitle>
                <CardDescription>
                  Latest leads for {currentTenant?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leads.slice(0, 5).map((lead) => (
                    <div
                      key={lead.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-100">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            {lead.firstName} {lead.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {lead.company}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={getStatusColor(lead.status)}
                          variant="outline"
                        >
                          {lead.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          ₹{((lead.expectedValue || 0) / 100000).toFixed(1)}L
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common CRM tasks for {currentTenant?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  <div className="grid grid-cols-2 gap-2">
                    <ProtectedComponent permissions="leads.create">
                      <Button
                        onClick={() =>
                          setModals((prev) => ({ ...prev, createLead: true }))
                        }
                        className="w-full justify-start"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Lead
                      </Button>
                    </ProtectedComponent>
                    <Button
                      variant="outline"
                      onClick={() => handleTabChange("leads")}
                      className="w-full justify-start"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      View All Leads
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleTabChange("sources")}
                      className="w-full justify-start"
                    >
                      <Target className="mr-2 h-4 w-4" />
                      Lead Sources
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleTabChange("pipeline")}
                      className="w-full justify-start"
                    >
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Pipeline View
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setModals((prev) => ({ ...prev, importLeads: true }))
                      }
                      className="w-full justify-start"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Import Leads
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleTabChange("analytics")}
                      className="w-full justify-start"
                    >
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View Analytics
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Leads Tab */}
        <TabsContent value="leads" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-2 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="negotiation">Negotiation</SelectItem>
                  <SelectItem value="won">Won</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStage} onValueChange={setFilterStage}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="prospect">Prospect</SelectItem>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="opportunity">Opportunity</SelectItem>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="negotiation">Negotiation</SelectItem>
                  <SelectItem value="closed_won">Closed Won</SelectItem>
                  <SelectItem value="closed_lost">Closed Lost</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <ProtectedComponent permissions="leads.create">
                <Button
                  onClick={() =>
                    setModals((prev) => ({ ...prev, createLead: true }))
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Lead
                </Button>
              </ProtectedComponent>
              <Button
                variant="outline"
                onClick={() =>
                  setModals((prev) => ({ ...prev, exportLeads: true }))
                }
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Leads ({filteredLeads.length})</CardTitle>
              <CardDescription>
                Manage leads for {currentTenant?.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lead</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.slice(0, 20).map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {lead.firstName} {lead.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {lead.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{lead.company || "—"}</p>
                          <p className="text-sm text-muted-foreground">
                            {lead.designation || "���"}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(lead.status)}>
                          {lead.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getStageColor(lead.stage)}
                          variant="outline"
                        >
                          {lead.stage}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(lead.priority)}>
                          {lead.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            ₹{((lead.expectedValue || 0) / 100000).toFixed(1)}L
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {lead.currency}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {lead.assignedTo || "Unassigned"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(lead.createdAt).toLocaleDateString()}
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
                              onClick={() => handleLeadAction("view", lead)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleLeadAction("edit", lead)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Lead
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleLeadAction("contact", lead)}
                            >
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleLeadAction("delete", lead)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sources Tab */}
        <TabsContent value="sources" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Lead Sources</h2>
              <p className="text-muted-foreground">
                Manage lead sources for {currentTenant?.name}
              </p>
            </div>
            <ProtectedComponent permissions="lead_sources.create">
              <Button
                onClick={() =>
                  setModals((prev) => ({ ...prev, createSource: true }))
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Source
              </Button>
            </ProtectedComponent>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {leadSources.map((source) => (
              <Card key={source.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{source.name}</CardTitle>
                    <Badge variant="outline">{source.type}</Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {source.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Total Leads:</span>
                      <span className="font-medium">{source.totalLeads}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Converted:</span>
                      <span className="font-medium">
                        {source.convertedLeads}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Conversion Rate:</span>
                      <span className="font-medium">
                        {source.conversionRate.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Cost:</span>
                      <span className="font-medium">
                        {source.cost
                          ? `₹${(source.cost / 1000).toFixed(0)}K`
                          : "Free"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={source.isActive ? "default" : "secondary"}
                      >
                        {source.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="outline">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => handleSourceAction("edit", source)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleSourceAction("toggle", source)}
                          >
                            {source.isActive ? (
                              <>
                                <XCircle className="mr-2 h-4 w-4" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleSourceAction("delete", source)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Communication Tab */}
        <TabsContent value="communication" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Communication Center</h2>
              <p className="text-muted-foreground">
                Manage communications for {currentTenant?.name}
              </p>
            </div>
            <div className="flex gap-2">
              <ProtectedComponent permissions="communication.create">
                <Button
                  onClick={() =>
                    setModals((prev) => ({ ...prev, sendMessage: true }))
                  }
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </ProtectedComponent>
              <ProtectedComponent permissions="communication.templates">
                <Button
                  variant="outline"
                  onClick={() =>
                    setModals((prev) => ({ ...prev, createTemplate: true }))
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Template
                </Button>
              </ProtectedComponent>
            </div>
          </div>

          {/* Communication Statistics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Messages Sent</CardTitle>
                <CardDescription>This month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  +12.5%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Open Rate</CardTitle>
                <CardDescription>Email campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68.3%</div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  +3.2%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Response Rate</CardTitle>
                <CardDescription>All channels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.7%</div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  +1.8%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Templates</CardTitle>
                <CardDescription>Active templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <div className="flex items-center gap-1 text-sm text-blue-600">
                  <Plus className="h-3 w-3" />2 new
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Communications */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Communications</CardTitle>
              <CardDescription>
                Latest messages and campaigns for {currentTenant?.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    type: "Email",
                    subject: "Property Viewing Confirmation",
                    recipient: "John Smith",
                    time: "2 hours ago",
                    status: "Delivered",
                  },
                  {
                    type: "SMS",
                    subject: "Payment Reminder",
                    recipient: "Sarah Johnson",
                    time: "4 hours ago",
                    status: "Read",
                  },
                  {
                    type: "WhatsApp",
                    subject: "Project Update",
                    recipient: "Mike Wilson",
                    time: "6 hours ago",
                    status: "Replied",
                  },
                  {
                    type: "Email",
                    subject: "Welcome to BuildCorp",
                    recipient: "Lisa Chen",
                    time: "1 day ago",
                    status: "Opened",
                  },
                ].map((comm, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          comm.status === "Delivered"
                            ? "bg-blue-500"
                            : comm.status === "Read"
                              ? "bg-green-500"
                              : comm.status === "Replied"
                                ? "bg-purple-500"
                                : "bg-yellow-500"
                        }`}
                      />
                      <div>
                        <p className="font-medium">{comm.subject}</p>
                        <p className="text-sm text-muted-foreground">
                          {comm.type} to {comm.recipient}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{comm.status}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {comm.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pipeline Tab */}
        <TabsContent value="pipeline" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Sales Pipeline</h2>
              <p className="text-muted-foreground">
                Visual pipeline for {currentTenant?.name}
              </p>
            </div>
            <div className="flex gap-2">
              <ProtectedComponent permissions="deals.create">
                <Button
                  onClick={() =>
                    setModals((prev) => ({ ...prev, createDeal: true }))
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Deal
                </Button>
              </ProtectedComponent>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Customize
              </Button>
            </div>
          </div>

          {/* Pipeline stages */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {["prospect", "lead", "opportunity", "proposal"].map((stage) => {
              const stageLeads = getLeadsByStage(
                selectedTenantId,
                stage as LeadStage,
              );
              const stageValue = stageLeads.reduce(
                (sum, l) => sum + (l.expectedValue || 0),
                0,
              );

              return (
                <Card key={stage}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center justify-between">
                      <span className="capitalize">{stage}</span>
                      <Badge variant="outline">{stageLeads.length}</Badge>
                    </CardTitle>
                    <CardDescription>
                      ₹{(stageValue / 1000000).toFixed(1)}M value
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {stageLeads.slice(0, 3).map((lead) => (
                        <div
                          key={lead.id}
                          className="p-2 border rounded cursor-pointer hover:bg-muted/50"
                          onClick={() => handleLeadAction("view", lead)}
                        >
                          <p className="font-medium text-sm">
                            {lead.firstName} {lead.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {lead.company}
                          </p>
                          <p className="text-xs font-medium">
                            ₹{((lead.expectedValue || 0) / 100000).toFixed(1)}L
                          </p>
                        </div>
                      ))}
                      {stageLeads.length > 3 && (
                        <p className="text-xs text-muted-foreground text-center">
                          +{stageLeads.length - 3} more
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Analytics & Reports</h2>
              <p className="text-muted-foreground">
                Performance insights for {currentTenant?.name}
              </p>
            </div>
            <div className="flex gap-2">
              <ProtectedComponent permissions="analytics.export">
                <Button
                  variant="outline"
                  onClick={() =>
                    setModals((prev) => ({ ...prev, exportAnalytics: true }))
                  }
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </ProtectedComponent>
              <ProtectedComponent permissions="analytics.configure">
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Configure
                </Button>
              </ProtectedComponent>
            </div>
          </div>
          {analytics ? (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Lead Velocity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {analytics.tenantKPIs.leadVelocity}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Leads per day
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Sales Velocity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ₹
                      {(analytics.tenantKPIs.salesVelocity / 1000000).toFixed(
                        1,
                      )}
                      M
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Revenue per day
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">CAC</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ₹
                      {(
                        analytics.tenantKPIs.customerAcquisitionCost / 1000
                      ).toFixed(0)}
                      K
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Customer acquisition cost
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Win Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {analytics.tenantKPIs.winRate.toFixed(1)}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Conversion rate
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Source Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Source Performance</CardTitle>
                  <CardDescription>
                    Lead source analytics and ROI
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.sourceBreakdown.map((source) => (
                      <div
                        key={source.sourceId}
                        className="flex items-center justify-between p-3 border rounded"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{source.sourceName}</p>
                          <p className="text-sm text-muted-foreground">
                            {source.leads} leads • {source.converted} converted
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {source.conversionRate.toFixed(1)}%
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ROI:{" "}
                            {source.roi === Infinity
                              ? "∞"
                              : source.roi.toFixed(1)}
                            x
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Team Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Team Performance</CardTitle>
                  <CardDescription>
                    Individual and territory performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.teamPerformance.map((member) => (
                      <div
                        key={member.userId}
                        className="flex items-center justify-between p-3 border rounded"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{member.userName}</p>
                          <p className="text-sm text-muted-foreground">
                            {member.role} • {member.territory}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {member.conversionRate.toFixed(1)}%
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ₹{(member.value / 1000000).toFixed(1)}M revenue
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No Analytics Data</h3>
              <p className="text-muted-foreground">
                Analytics data will appear here once you have sufficient lead
                data.
              </p>
            </div>
          )}
        </TabsContent>

        {/* Conversion Management Tab */}
        <TabsContent value="conversion" className="space-y-6">
          <LeadConversionManager
            tenantId={selectedTenantId}
            selectedLead={selectedLead}
            onConversionComplete={(results) => {
              toast({
                title: "Conversion Completed",
                description: "Lead has been successfully converted.",
              });
              // Reload data to reflect changes
              const updatedLeads = getTenantLeads(selectedTenantId);
              // Update local state or trigger refresh
            }}
          />
        </TabsContent>

        {/* Assignment Queue Management Tab */}
        <TabsContent value="assignment" className="space-y-6">
          <AssignmentQueueManager
            tenantId={selectedTenantId}
            onLeadAssigned={(leadId, userId) => {
              toast({
                title: "Lead Assigned",
                description: `Lead has been assigned to team member.`,
              });
              // Update lead assignment in local state
            }}
          />
        </TabsContent>

        {/* Duplicate Detection Tab */}
        <TabsContent value="duplicates" className="space-y-6">
          <DuplicateDetectionManager
            tenantId={selectedTenantId}
            onDuplicateResolved={(resolution) => {
              toast({
                title: "Duplicate Resolved",
                description: `Duplicate has been resolved: ${resolution.action}`,
              });
              // Handle post-resolution actions
            }}
          />
        </TabsContent>
      </Tabs>

      {/* Modals - Placeholder implementations */}
      {/* Create Lead Modal */}
      <Dialog
        open={modals.createLead}
        onOpenChange={(open) => !open && closeModal("createLead")}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Lead</DialogTitle>
            <DialogDescription>
              Create a new lead for {currentTenant?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" placeholder="Enter first name" />
              </div>
              <div>
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" placeholder="Enter last name" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Enter company name" />
              </div>
              <div>
                <Label htmlFor="designation">Designation</Label>
                <Input id="designation" placeholder="Enter designation" />
              </div>
            </div>
            <div>
              <Label htmlFor="requirements">Requirements</Label>
              <textarea
                id="requirements"
                className="w-full min-h-20 p-3 border border-input bg-background rounded-md"
                placeholder="Describe lead requirements"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => closeModal("createLead")}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // TODO: Implement lead creation
                  closeModal("createLead");
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Lead
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Lead Modal */}
      <Dialog
        open={modals.viewLead}
        onOpenChange={(open) => !open && closeModal("viewLead")}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
            <DialogDescription>
              Complete information for this lead
            </DialogDescription>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <div className="p-3 bg-muted rounded-md">
                    {selectedLead.firstName} {selectedLead.lastName}
                  </div>
                </div>
                <div>
                  <Label>Company</Label>
                  <div className="p-3 bg-muted rounded-md">
                    {selectedLead.company || "—"}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Email</Label>
                  <div className="p-3 bg-muted rounded-md">
                    {selectedLead.email}
                  </div>
                </div>
                <div>
                  <Label>Phone</Label>
                  <div className="p-3 bg-muted rounded-md">
                    {selectedLead.phone}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Status</Label>
                  <div className="p-3 bg-muted rounded-md">
                    <Badge className={getStatusColor(selectedLead.status)}>
                      {selectedLead.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label>Stage</Label>
                  <div className="p-3 bg-muted rounded-md">
                    <Badge
                      className={getStageColor(selectedLead.stage)}
                      variant="outline"
                    >
                      {selectedLead.stage}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label>Priority</Label>
                  <div className="p-3 bg-muted rounded-md">
                    <Badge className={getPriorityColor(selectedLead.priority)}>
                      {selectedLead.priority}
                    </Badge>
                  </div>
                </div>
              </div>
              <div>
                <Label>Requirements</Label>
                <div className="p-3 bg-muted rounded-md">
                  {selectedLead.requirements || "No requirements specified"}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => closeModal("viewLead")}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    closeModal("viewLead");
                    setModals((prev) => ({ ...prev, editLead: true }));
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Lead
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Lead Modal */}
      <Dialog
        open={modals.editLead}
        onOpenChange={(open) => !open && closeModal("editLead")}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Lead</DialogTitle>
            <DialogDescription>Update lead information</DialogDescription>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-first-name">First Name</Label>
                  <Input
                    id="edit-first-name"
                    defaultValue={selectedLead.firstName}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-last-name">Last Name</Label>
                  <Input
                    id="edit-last-name"
                    defaultValue={selectedLead.lastName}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    defaultValue={selectedLead.email}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input id="edit-phone" defaultValue={selectedLead.phone} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="edit-status">Status</Label>
                  <Select defaultValue={selectedLead.status}>
                    <SelectTrigger>
                      <SelectValue />
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
                </div>
                <div>
                  <Label htmlFor="edit-stage">Stage</Label>
                  <Select defaultValue={selectedLead.stage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prospect">Prospect</SelectItem>
                      <SelectItem value="lead">Lead</SelectItem>
                      <SelectItem value="opportunity">Opportunity</SelectItem>
                      <SelectItem value="proposal">Proposal</SelectItem>
                      <SelectItem value="negotiation">Negotiation</SelectItem>
                      <SelectItem value="closed_won">Closed Won</SelectItem>
                      <SelectItem value="closed_lost">Closed Lost</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-priority">Priority</Label>
                  <Select defaultValue={selectedLead.priority}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => closeModal("editLead")}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    // TODO: Implement lead update
                    closeModal("editLead");
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Update Lead
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Source Modal */}
      <Dialog
        open={modals.createSource}
        onOpenChange={(open) => !open && closeModal("createSource")}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Lead Source</DialogTitle>
            <DialogDescription>
              Create a new lead source for {currentTenant?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="source-name">Source Name</Label>
                <Input id="source-name" placeholder="Enter source name" />
              </div>
              <div>
                <Label htmlFor="source-type">Type</Label>
                <Select defaultValue="digital">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="digital">Digital</SelectItem>
                    <SelectItem value="traditional">Traditional</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="direct">Direct</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="source-description">Description</Label>
              <textarea
                id="source-description"
                className="w-full min-h-20 p-3 border border-input bg-background rounded-md"
                placeholder="Describe the lead source"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="source-cost">Cost (Optional)</Label>
                <Input
                  id="source-cost"
                  type="number"
                  placeholder="Enter cost"
                />
              </div>
              <div>
                <Label htmlFor="source-tracking">Tracking Code</Label>
                <Input id="source-tracking" placeholder="Enter tracking code" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => closeModal("createSource")}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // TODO: Implement source creation
                  closeModal("createSource");
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Source
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Send Communication Modal */}
      <Dialog
        open={modals.sendCommunication}
        onOpenChange={(open) => !open && closeModal("sendCommunication")}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Message</DialogTitle>
            <DialogDescription>
              Send a message to {selectedLead?.firstName}{" "}
              {selectedLead?.lastName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="message-type">Message Type</Label>
              <Select defaultValue="email">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="message-subject">Subject</Label>
              <Input id="message-subject" placeholder="Enter subject" />
            </div>
            <div>
              <Label htmlFor="message-content">Message</Label>
              <textarea
                id="message-content"
                className="w-full min-h-32 p-3 border border-input bg-background rounded-md"
                placeholder="Enter your message"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => closeModal("sendCommunication")}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // TODO: Implement send communication
                  closeModal("sendCommunication");
                }}
              >
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Import Leads Modal */}
      <Dialog
        open={modals.importLeads}
        onOpenChange={(open) => !open && closeModal("importLeads")}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Import Leads</DialogTitle>
            <DialogDescription>
              Import leads from CSV file for {currentTenant?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="import-file">CSV File</Label>
              <Input id="import-file" type="file" accept=".csv" />
              <p className="text-sm text-muted-foreground mt-1">
                Upload a CSV file with lead data
              </p>
            </div>
            <div>
              <Label>Import Options</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="skip-duplicates" defaultChecked />
                  <Label htmlFor="skip-duplicates" className="text-sm">
                    Skip duplicate emails
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="send-welcome" />
                  <Label htmlFor="send-welcome" className="text-sm">
                    Send welcome email to new leads
                  </Label>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => closeModal("importLeads")}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // TODO: Implement lead import
                  closeModal("importLeads");
                }}
              >
                <Upload className="mr-2 h-4 w-4" />
                Import Leads
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Export Leads Modal */}
      <Dialog
        open={modals.exportLeads}
        onOpenChange={(open) => !open && closeModal("exportLeads")}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Export Leads</DialogTitle>
            <DialogDescription>
              Export leads data for {currentTenant?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Export Format</Label>
              <Select defaultValue="csv">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="pdf">PDF Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Data to Export</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="export-all" defaultChecked />
                  <Label htmlFor="export-all" className="text-sm">
                    All lead data
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="export-activities" />
                  <Label htmlFor="export-activities" className="text-sm">
                    Include activities
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="export-notes" />
                  <Label htmlFor="export-notes" className="text-sm">
                    Include notes
                  </Label>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => closeModal("exportLeads")}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // TODO: Implement lead export
                  closeModal("exportLeads");
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
      <Dialog
        open={modals.settings}
        onOpenChange={(open) => !open && closeModal("settings")}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>CRM Settings</DialogTitle>
            <DialogDescription>
              Configure CRM settings for {currentTenant?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Lead Assignment</Label>
              <Select defaultValue="round_robin">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="round_robin">Round Robin</SelectItem>
                  <SelectItem value="manual">Manual Assignment</SelectItem>
                  <SelectItem value="territory">Territory Based</SelectItem>
                  <SelectItem value="workload">Workload Based</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="follow-up-days">Follow-up Reminder (Days)</Label>
              <Input id="follow-up-days" type="number" defaultValue="7" />
            </div>
            <div>
              <Label>Default Currency</Label>
              <Select defaultValue="INR">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">INR (₹)</SelectItem>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Notifications</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="new-lead-alerts" defaultChecked />
                  <Label htmlFor="new-lead-alerts" className="text-sm">
                    New lead alerts
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="follow-up-reminders"
                    defaultChecked
                  />
                  <Label htmlFor="follow-up-reminders" className="text-sm">
                    Follow-up reminders
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="deal-notifications"
                    defaultChecked
                  />
                  <Label htmlFor="deal-notifications" className="text-sm">
                    Deal status notifications
                  </Label>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => closeModal("settings")}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // TODO: Implement settings update
                  closeModal("settings");
                }}
              >
                <Settings className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Send Message Modal */}
      <Dialog
        open={modals.sendMessage}
        onOpenChange={(open) => !open && closeModal("sendMessage")}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Message</DialogTitle>
            <DialogDescription>
              Send a message to leads or customers
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Message Type</Label>
              <Select defaultValue="email">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="msg-subject">Subject</Label>
              <Input id="msg-subject" placeholder="Enter message subject" />
            </div>
            <div>
              <Label htmlFor="msg-body">Message</Label>
              <textarea
                id="msg-body"
                className="w-full p-2 border rounded-md min-h-[100px]"
                placeholder="Enter your message content..."
              />
            </div>
            <div>
              <Label>Recipients</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select recipients" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-leads">All Leads</SelectItem>
                  <SelectItem value="active-leads">Active Leads</SelectItem>
                  <SelectItem value="custom">Custom Selection</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => closeModal("sendMessage")}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // TODO: Implement send message
                  closeModal("sendMessage");
                }}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Template Modal */}
      <Dialog
        open={modals.createTemplate}
        onOpenChange={(open) => !open && closeModal("createTemplate")}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Template</DialogTitle>
            <DialogDescription>
              Create a reusable message template
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="template-name">Template Name</Label>
              <Input id="template-name" placeholder="Enter template name" />
            </div>
            <div>
              <Label>Template Type</Label>
              <Select defaultValue="email">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email Template</SelectItem>
                  <SelectItem value="sms">SMS Template</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp Template</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="template-subject">Subject</Label>
              <Input
                id="template-subject"
                placeholder="Enter template subject"
              />
            </div>
            <div>
              <Label htmlFor="template-body">Template Content</Label>
              <textarea
                id="template-body"
                className="w-full p-2 border rounded-md min-h-[120px]"
                placeholder="Enter template content with variables like {name}, {company}..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => closeModal("createTemplate")}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // TODO: Implement template creation
                  closeModal("createTemplate");
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Template
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Deal Modal */}
      <Dialog
        open={modals.createDeal}
        onOpenChange={(open) => !open && closeModal("createDeal")}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Deal</DialogTitle>
            <DialogDescription>
              Add a new deal to the pipeline
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="deal-name">Deal Name</Label>
                <Input id="deal-name" placeholder="Enter deal name" />
              </div>
              <div>
                <Label htmlFor="deal-value">Deal Value (₹)</Label>
                <Input
                  id="deal-value"
                  type="number"
                  placeholder="Enter deal value"
                />
              </div>
            </div>
            <div>
              <Label>Associated Lead</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select lead" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lead1">John Smith - BuildCorp</SelectItem>
                  <SelectItem value="lead2">
                    Sarah Johnson - Metro Realty
                  </SelectItem>
                  <SelectItem value="lead3">
                    Mike Wilson - Skyline Dev
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Stage</Label>
                <Select defaultValue="prospect">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prospect">Prospect</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="opportunity">Opportunity</SelectItem>
                    <SelectItem value="proposal">Proposal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Priority</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="deal-notes">Notes</Label>
              <textarea
                id="deal-notes"
                className="w-full p-2 border rounded-md min-h-[80px]"
                placeholder="Add any notes about this deal..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => closeModal("createDeal")}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // TODO: Implement deal creation
                  closeModal("createDeal");
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Deal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Export Analytics Modal */}
      <Dialog
        open={modals.exportAnalytics}
        onOpenChange={(open) => !open && closeModal("exportAnalytics")}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Export Analytics Report</DialogTitle>
            <DialogDescription>
              Generate and export analytics report for {currentTenant?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Report Type</Label>
              <Select defaultValue="comprehensive">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comprehensive">
                    Comprehensive Report
                  </SelectItem>
                  <SelectItem value="lead-performance">
                    Lead Performance
                  </SelectItem>
                  <SelectItem value="source-analysis">
                    Source Analysis
                  </SelectItem>
                  <SelectItem value="conversion-metrics">
                    Conversion Metrics
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date-from">From Date</Label>
                <Input id="date-from" type="date" />
              </div>
              <div>
                <Label htmlFor="date-to">To Date</Label>
                <Input id="date-to" type="date" />
              </div>
            </div>
            <div>
              <Label>Export Format</Label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Report</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  <SelectItem value="csv">CSV Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Include</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="include-charts" defaultChecked />
                  <Label htmlFor="include-charts" className="text-sm">
                    Charts and graphs
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="include-raw-data" />
                  <Label htmlFor="include-raw-data" className="text-sm">
                    Raw data tables
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="include-insights" defaultChecked />
                  <Label htmlFor="include-insights" className="text-sm">
                    AI insights and recommendations
                  </Label>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => closeModal("exportAnalytics")}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // TODO: Implement analytics export
                  closeModal("exportAnalytics");
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
