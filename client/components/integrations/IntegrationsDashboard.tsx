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
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  AnimatedIcon,
  PulsingDot,
  GlowingOrb,
  ShimmerEffect,
} from "../ui/animated-icons";
import { AnimatedCounter } from "../ui/animated-counter";
import {
  Settings,
  RefreshCw,
  MoreHorizontal,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Activity,
  Zap,
  Mail,
  MessageSquare,
  Phone,
  Map,
  FileSignature,
  Cloud,
  Building2,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  ExternalLink,
  Download,
  Upload,
  AlertCircle,
  Info,
} from "lucide-react";
import {
  mockIntegrations,
  mockCampaigns,
  mockLeads,
  mockDocuments,
  mockSyncLogs,
} from "./data";
import { Integration, IntegrationCategory } from "./types";

interface IntegrationsDashboardProps {
  onConfigureIntegration?: (integration: Integration) => void;
  onTestIntegration?: (integration: Integration) => void;
}

const categoryIcons = {
  marketing: Mail,
  sales: TrendingUp,
  erp: Building2,
  communication: MessageSquare,
  maps: Map,
  signature: FileSignature,
  storage: Cloud,
};

const statusColors = {
  connected: "text-green-600",
  disconnected: "text-gray-500",
  error: "text-red-600",
  pending: "text-yellow-600",
};

const statusBadges = {
  connected: "default",
  disconnected: "secondary",
  error: "destructive",
  pending: "outline",
} as const;

export function IntegrationsDashboard({
  onConfigureIntegration,
  onTestIntegration,
}: IntegrationsDashboardProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    IntegrationCategory | "all"
  >("all");
  const [syncingIntegrations, setSyncingIntegrations] = useState<Set<string>>(
    new Set(),
  );

  const filteredIntegrations =
    selectedCategory === "all"
      ? mockIntegrations
      : mockIntegrations.filter((int) => int.category === selectedCategory);

  const connectedIntegrations = mockIntegrations.filter(
    (int) => int.status === "connected",
  );
  const totalApiCalls = connectedIntegrations.reduce(
    (sum, int) => sum + (int.usage?.apiCalls || 0),
    0,
  );
  const totalDataTransferred = connectedIntegrations.reduce(
    (sum, int) => sum + (int.usage?.dataTransferred || 0),
    0,
  );

  const handleSync = async (integrationId: string) => {
    setSyncingIntegrations((prev) => new Set([...prev, integrationId]));

    // Simulate API call
    setTimeout(() => {
      setSyncingIntegrations((prev) => {
        const newSet = new Set(prev);
        newSet.delete(integrationId);
        return newSet;
      });
    }, 2000);
  };

  const getCategoryStats = () => {
    const categories = mockIntegrations.reduce(
      (acc, integration) => {
        if (!acc[integration.category]) {
          acc[integration.category] = { total: 0, connected: 0 };
        }
        acc[integration.category].total++;
        if (integration.status === "connected") {
          acc[integration.category].connected++;
        }
        return acc;
      },
      {} as Record<string, { total: number; connected: number }>,
    );

    return Object.entries(categories).map(([category, stats]) => ({
      category: category as IntegrationCategory,
      ...stats,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="hover-lift animate-fadeInUp">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <AnimatedIcon
                  icon={Zap}
                  animation="glow"
                  className="h-6 w-6 text-primary"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedCounter value={connectedIntegrations.length} />
                  <span className="text-muted-foreground">
                    /{mockIntegrations.length}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Active Integrations
                </p>
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
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                <AnimatedIcon
                  icon={Activity}
                  animation="pulse"
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedCounter value={totalApiCalls} />
                </p>
                <p className="text-sm text-muted-foreground">API Calls Today</p>
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
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                <AnimatedIcon
                  icon={Upload}
                  animation="bounce"
                  className="h-6 w-6 text-green-600 dark:text-green-400"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedCounter value={Math.round(totalDataTransferred)} />
                  <span className="text-sm font-normal">MB</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Data Transferred
                </p>
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
                  icon={AlertCircle}
                  animation="pulse"
                  className="h-6 w-6 text-orange-600 dark:text-orange-400"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <AnimatedCounter
                    value={mockSyncLogs.filter((log) => log.errors).length}
                  />
                </p>
                <p className="text-sm text-muted-foreground">Recent Errors</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <Card className="animate-fadeInUp">
        <CardHeader>
          <CardTitle>Integration Categories</CardTitle>
          <CardDescription>
            Manage your third-party integrations by category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className="justify-start min-w-fit"
              size="sm"
            >
              All ({mockIntegrations.length})
            </Button>
            {getCategoryStats().map(({ category, total, connected }) => {
              const Icon = categoryIcons[category];
              return (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category)}
                  className="justify-start min-w-fit capitalize"
                  size="sm"
                >
                  <Icon className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="whitespace-nowrap">
                    {category} ({connected}/{total})
                  </span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Integrations Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredIntegrations.map((integration, index) => {
          const Icon = categoryIcons[integration.category];
          const isSyncing = syncingIntegrations.has(integration.id);

          return (
            <Card
              key={integration.id}
              className="hover-lift animate-scaleIn group relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{integration.icon}</div>
                    <div>
                      <CardTitle className="text-lg">
                        {integration.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={statusBadges[integration.status]}>
                          {integration.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Icon className="h-3 w-3 mr-1" />
                          {integration.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onConfigureIntegration?.(integration)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleSync(integration.id)}
                        disabled={
                          isSyncing || integration.status !== "connected"
                        }
                      >
                        <RefreshCw
                          className={`h-4 w-4 mr-2 ${isSyncing ? "animate-spin" : ""}`}
                        />
                        {isSyncing ? "Syncing..." : "Sync Now"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onTestIntegration?.(integration)}
                      >
                        <Activity className="h-4 w-4 mr-2" />
                        Test Connection
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {integration.description}
                </CardDescription>

                {integration.status === "connected" && integration.usage && (
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>API Usage</span>
                        <span>
                          {integration.usage.apiCalls.toLocaleString()} /{" "}
                          {integration.usage.apiLimit.toLocaleString()}
                        </span>
                      </div>
                      <Progress
                        value={
                          (integration.usage.apiCalls /
                            integration.usage.apiLimit) *
                          100
                        }
                        className="h-2"
                      />
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>
                        Last sync:{" "}
                        {new Date(integration.lastSync!).toLocaleTimeString()}
                      </span>
                      {integration.usage.errors > 0 && (
                        <div className="flex items-center gap-1 text-red-600">
                          <AlertTriangle className="h-3 w-3" />
                          {integration.usage.errors} errors
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-1 mt-3">
                  {integration.features.slice(0, 3).map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {integration.features.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{integration.features.length - 3} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card className="animate-fadeInUp">
        <CardHeader>
          <CardTitle>Recent Sync Activity</CardTitle>
          <CardDescription>
            Latest synchronization logs across all integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Integration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Records</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSyncLogs.map((log) => {
                const integration = mockIntegrations.find(
                  (int) => int.id === log.integrationId,
                );
                return (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{integration?.icon}</span>
                        {integration?.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          log.status === "success"
                            ? "default"
                            : log.status === "failed"
                              ? "destructive"
                              : "outline"
                        }
                      >
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {log.recordsProcessed.toLocaleString()}
                    </TableCell>
                    <TableCell>{(log.duration / 1000).toFixed(1)}s</TableCell>
                    <TableCell>
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
