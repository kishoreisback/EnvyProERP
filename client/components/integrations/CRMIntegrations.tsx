import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";
import { AnimatedIcon, PulsingDot } from "../ui/animated-icons";
import { AnimatedCounter } from "../ui/animated-counter";
import {
  TrendingUp,
  Users,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  Building,
  Calendar,
  ExternalLink,
  Eye,
  Edit,
  UserCheck,
  Target,
  Activity,
  RefreshCw,
  Download,
  Filter,
  Search,
} from "lucide-react";
import { mockIntegrations, mockLeads } from "./data";
import { CRMLead } from "./types";

export function CRMIntegrations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [syncingLeads, setSyncingLeads] = useState(false);

  const crmIntegrations = mockIntegrations.filter(
    (int) => int.category === "sales",
  );
  const connectedCRMIntegrations = crmIntegrations.filter(
    (int) => int.status === "connected",
  );

  const filteredLeads = mockLeads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.source.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" || lead.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const totalLeads = mockLeads.length;
  const totalValue = mockLeads.reduce(
    (sum, lead) => sum + (lead.value || 0),
    0,
  );
  const qualifiedLeads = mockLeads.filter(
    (lead) => lead.status === "qualified",
  ).length;
  const convertedLeads = mockLeads.filter(
    (lead) => lead.status === "converted",
  ).length;

  const handleSyncLeads = async () => {
    setSyncingLeads(true);
    // Simulate API call
    setTimeout(() => {
      setSyncingLeads(false);
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "text-blue-600";
      case "qualified":
        return "text-green-600";
      case "contacted":
        return "text-yellow-600";
      case "converted":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return "outline";
      case "qualified":
        return "default";
      case "contacted":
        return "secondary";
      case "converted":
        return "default";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      {/* CRM Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="hover-lift animate-fadeInUp">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                <AnimatedIcon
                  icon={Users}
                  animation="float"
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedCounter value={totalLeads} />
                </p>
                <p className="text-sm text-muted-foreground">Total Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="hover-lift animate-fadeInUp"
          style={{ animationDelay: "0.1s" }}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                <AnimatedIcon
                  icon={UserCheck}
                  animation="bounce"
                  className="h-6 w-6 text-green-600 dark:text-green-400"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedCounter value={qualifiedLeads} />
                </p>
                <p className="text-sm text-muted-foreground">Qualified</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="hover-lift animate-fadeInUp"
          style={{ animationDelay: "0.2s" }}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
                <AnimatedIcon
                  icon={Target}
                  animation="pulse"
                  className="h-6 w-6 text-purple-600 dark:text-purple-400"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedCounter value={convertedLeads} />
                </p>
                <p className="text-sm text-muted-foreground">Converted</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="hover-lift animate-fadeInUp"
          style={{ animationDelay: "0.3s" }}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900">
                <AnimatedIcon
                  icon={DollarSign}
                  animation="glow"
                  className="h-6 w-6 text-orange-600 dark:text-orange-400"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  ₹<AnimatedCounter value={Math.round(totalValue / 100000)} />L
                </p>
                <p className="text-sm text-muted-foreground">Total Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connected CRM Integrations */}
      <Card className="animate-fadeInUp">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Connected CRM Systems</CardTitle>
              <CardDescription>
                Sync leads and opportunities from your CRM platforms
              </CardDescription>
            </div>
            <Button
              onClick={handleSyncLeads}
              disabled={syncingLeads}
              className="hover-lift"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${syncingLeads ? "animate-spin" : ""}`}
              />
              {syncingLeads ? "Syncing..." : "Sync Now"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {connectedCRMIntegrations.map((integration) => (
              <Card key={integration.id} className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl">{integration.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{integration.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          Connected
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {integration.provider}
                      </p>
                    </div>
                  </div>

                  {integration.usage && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>API Calls Today</span>
                        <span>
                          {integration.usage.apiCalls.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Last Sync</span>
                        <span>
                          {new Date(integration.lastSync!).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Data Transferred</span>
                        <span>{integration.usage.dataTransferred}MB</span>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-3">
                    <div className="flex gap-1">
                      {integration.features.slice(0, 2).map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-1 bg-muted rounded text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lead Management */}
      <Card className="animate-fadeInUp">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Lead Management</CardTitle>
              <CardDescription>
                Manage leads synchronized from your CRM systems
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search leads by name, email, or source..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="qualified">Qualified</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
            </select>
          </div>

          {/* Leads Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <p className="font-medium">{lead.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {lead.assignedTo
                            ? `Assigned to ${lead.assignedTo}`
                            : "Unassigned"}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3" />
                          {lead.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="h-3 w-3" />
                          {lead.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {lead.source === "Salesforce" && (
                          <span className="text-blue-600">☁️</span>
                        )}
                        {lead.source === "Pipedrive" && (
                          <span className="text-green-600">🔄</span>
                        )}
                        {lead.source === "Google Maps" && (
                          <span className="text-red-600">🗺️</span>
                        )}
                        <span className="text-sm">{lead.source}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusBadge(lead.status) as any}
                        className={getStatusColor(lead.status)}
                      >
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {lead.value && (
                        <span className="font-medium">
                          ₹{(lead.value / 100000).toFixed(1)}L
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {lead.location && (
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate max-w-[150px]">
                            {lead.location.address}
                          </span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        {lead.location && (
                          <Button size="sm" variant="outline">
                            <MapPin className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Analytics */}
      <Card className="animate-fadeInUp">
        <CardHeader>
          <CardTitle>Sales Pipeline Analytics</CardTitle>
          <CardDescription>
            Track conversion rates and pipeline performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="font-medium">Lead Status Distribution</h4>
              <div className="space-y-2">
                {["new", "qualified", "contacted", "converted"].map(
                  (status) => {
                    const count = mockLeads.filter(
                      (lead) => lead.status === status,
                    ).length;
                    const percentage = (count / mockLeads.length) * 100;

                    return (
                      <div key={status} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{status}</span>
                          <span>
                            {count} ({percentage.toFixed(0)}%)
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Source Performance</h4>
              <div className="space-y-2">
                {["Salesforce", "Pipedrive", "Google Maps"].map((source) => {
                  const sourceLeads = mockLeads.filter(
                    (lead) => lead.source === source,
                  );
                  const count = sourceLeads.length;
                  const totalValue = sourceLeads.reduce(
                    (sum, lead) => sum + (lead.value || 0),
                    0,
                  );

                  return (
                    <div
                      key={source}
                      className="flex justify-between items-center p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{source}</p>
                        <p className="text-sm text-muted-foreground">
                          {count} leads
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ₹{(totalValue / 100000).toFixed(1)}L
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Avg: ₹{(totalValue / count / 100000).toFixed(1)}L
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
