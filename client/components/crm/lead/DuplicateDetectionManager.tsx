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
  AlertTriangle,
  CheckCircle,
  XCircle,
  Copy,
  Merge,
  Settings,
  Shield,
  Eye,
  RefreshCw,
  Search,
  Filter,
  TrendingUp,
  Users,
  FileX,
  Activity,
} from "lucide-react";
import { TenantLead } from "./types";
import {
  DuplicateDetectionConfig,
  DuplicateMatch,
  MatchedField,
  DuplicateResolution,
} from "./enhanced-types";
import {
  getDuplicateMatchesByTenant,
  mockDuplicateConfigs,
  detectDuplicates,
} from "./enhanced-data";
import { getTenantLeads } from "./data";
import { useToast } from "../../ui/use-toast";

interface DuplicateDetectionManagerProps {
  tenantId: string;
  candidateLead?: any; // New lead being created
  onDuplicateResolved?: (resolution: DuplicateResolution) => void;
}

export function DuplicateDetectionManager({
  tenantId,
  candidateLead,
  onDuplicateResolved,
}: DuplicateDetectionManagerProps) {
  const [duplicateMatches, setDuplicateMatches] = useState<DuplicateMatch[]>(
    [],
  );
  const [detectionConfig, setDetectionConfig] =
    useState<DuplicateDetectionConfig | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<DuplicateMatch | null>(
    null,
  );
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const [showMatchDialog, setShowMatchDialog] = useState(false);
  const [showMergeDialog, setShowMergeDialog] = useState(false);
  const [leads, setLeads] = useState<TenantLead[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    loadDuplicateData();
  }, [tenantId]);

  useEffect(() => {
    if (candidateLead && detectionConfig) {
      checkForDuplicates(candidateLead);
    }
  }, [candidateLead, detectionConfig]);

  const loadDuplicateData = () => {
    const matchData = getDuplicateMatchesByTenant(tenantId);
    const leadData = getTenantLeads(tenantId);
    const configData = mockDuplicateConfigs.find(
      (config) => config.tenantId === tenantId,
    );

    setDuplicateMatches(matchData);
    setLeads(leadData);
    setDetectionConfig(configData || null);
  };

  const checkForDuplicates = (candidate: any) => {
    if (!detectionConfig) return;

    const matches = detectDuplicates(candidate, leads, detectionConfig);

    if (matches.length > 0) {
      setDuplicateMatches([...duplicateMatches, ...matches]);

      // Show warning based on config
      if (detectionConfig.onDuplicateFound === "warn") {
        toast({
          title: "Potential Duplicates Found",
          description: `Found ${matches.length} potential duplicate(s). Please review before proceeding.`,
          variant: "destructive",
        });
      }
    }
  };

  const handleResolveDuplicate = async (
    matchId: string,
    resolution: DuplicateResolution,
  ) => {
    try {
      const updatedMatches = duplicateMatches.map((match) =>
        match.id === matchId
          ? {
              ...match,
              status: "resolved" as const,
              resolution,
              resolvedAt: new Date().toISOString(),
              resolvedBy: "current_user",
            }
          : match,
      );

      setDuplicateMatches(updatedMatches);

      toast({
        title: "Duplicate Resolved",
        description: `Duplicate has been resolved with action: ${resolution.action}`,
      });

      onDuplicateResolved?.(resolution);
      setShowMatchDialog(false);
      setShowMergeDialog(false);
    } catch (error) {
      toast({
        title: "Resolution Failed",
        description: "Failed to resolve duplicate. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleIgnoreDuplicate = async (matchId: string) => {
    const resolution: DuplicateResolution = {
      action: "keep_both",
      preservedFields: [],
      mergedFields: {},
    };

    await handleResolveDuplicate(matchId, resolution);
  };

  const handleMergeLeads = async (
    matchId: string,
    mergeToExisting: boolean,
  ) => {
    const match = duplicateMatches.find((m) => m.id === matchId);
    if (!match) return;

    const resolution: DuplicateResolution = {
      action: mergeToExisting ? "merge_to_existing" : "merge_to_candidate",
      mergedLeadId: mergeToExisting
        ? match.existingLeadId
        : match.candidateLeadId,
      deletedLeadId: mergeToExisting
        ? match.candidateLeadId
        : match.existingLeadId,
      preservedFields: ["id", "createdAt", "createdBy"],
      mergedFields: {
        notes: "Merged from duplicate lead",
        activities: "Combined activities from both leads",
      },
    };

    await handleResolveDuplicate(matchId, resolution);
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-red-600";
    if (score >= 75) return "text-orange-600";
    if (score >= 60) return "text-yellow-600";
    return "text-green-600";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="destructive">Pending</Badge>;
      case "resolved":
        return <Badge variant="default">Resolved</Badge>;
      case "ignored":
        return <Badge variant="secondary">Ignored</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredMatches = duplicateMatches.filter((match) => {
    const matchesSearch =
      !searchQuery ||
      match.candidateLeadId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.existingLeadId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || match.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const duplicateStats = {
    total: duplicateMatches.length,
    pending: duplicateMatches.filter((m) => m.status === "pending").length,
    resolved: duplicateMatches.filter((m) => m.status === "resolved").length,
    highRisk: duplicateMatches.filter((m) => m.matchScore >= 90).length,
    mediumRisk: duplicateMatches.filter(
      (m) => m.matchScore >= 75 && m.matchScore < 90,
    ).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Duplicate Detection Manager</h2>
          <p className="text-muted-foreground">
            Detect and manage duplicate leads across your organization
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowConfigDialog(true)}>
            <Settings className="mr-2 h-4 w-4" />
            Configure
          </Button>
          <Button onClick={loadDuplicateData}>
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
              Total Duplicates
            </CardTitle>
            <Copy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{duplicateStats.total}</div>
            <p className="text-xs text-muted-foreground">
              {duplicateStats.pending} pending review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {duplicateStats.highRisk}
            </div>
            <p className="text-xs text-muted-foreground">90%+ match score</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medium Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {duplicateStats.mediumRisk}
            </div>
            <p className="text-xs text-muted-foreground">75-90% match score</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Detection Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {leads.length > 0
                ? ((duplicateStats.total / leads.length) * 100).toFixed(1)
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground">Of total leads</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Auto-Prevention
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {detectionConfig?.phoneMatching.enabled &&
              detectionConfig?.emailMatching.enabled
                ? "ON"
                : "OFF"}
            </div>
            <p className="text-xs text-muted-foreground">Prevention active</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="matches" className="space-y-4">
        <TabsList>
          <TabsTrigger value="matches">Duplicate Matches</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="matches" className="space-y-4">
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by lead ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="ignored">Ignored</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Duplicate Matches</CardTitle>
              <CardDescription>
                Review and resolve potential duplicate leads
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Match Score</TableHead>
                    <TableHead>Candidate Lead</TableHead>
                    <TableHead>Existing Lead</TableHead>
                    <TableHead>Matched Fields</TableHead>
                    <TableHead>Detected</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMatches.map((match) => (
                    <TableRow key={match.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div
                            className={`text-lg font-bold ${getMatchScoreColor(match.matchScore)}`}
                          >
                            {match.matchScore}%
                          </div>
                          <div className="w-16">
                            <Progress value={match.matchScore} />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{match.candidateLeadId}</p>
                          <p className="text-sm text-muted-foreground">
                            Candidate
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{match.existingLeadId}</p>
                          <p className="text-sm text-muted-foreground">
                            Existing
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {match.matchedFields.slice(0, 3).map((field) => (
                            <Badge
                              key={field.fieldName}
                              variant="outline"
                              className="text-xs"
                            >
                              {field.fieldName}
                            </Badge>
                          ))}
                          {match.matchedFields.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{match.matchedFields.length - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(match.detectedAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(match.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedMatch(match);
                              setShowMatchDialog(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {match.status === "pending" && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedMatch(match);
                                  setShowMergeDialog(true);
                                }}
                              >
                                <Merge className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleIgnoreDuplicate(match.id)}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredMatches.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No duplicate matches found.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Detection Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Phone matches</span>
                    <span className="font-medium">
                      {
                        duplicateMatches.filter((m) =>
                          m.matchedFields.some((f) => f.fieldName === "phone"),
                        ).length
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Email matches</span>
                    <span className="font-medium">
                      {
                        duplicateMatches.filter((m) =>
                          m.matchedFields.some((f) => f.fieldName === "email"),
                        ).length
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Name matches</span>
                    <span className="font-medium">
                      {
                        duplicateMatches.filter((m) =>
                          m.matchedFields.some((f) =>
                            f.fieldName.includes("name"),
                          ),
                        ).length
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Company matches</span>
                    <span className="font-medium">
                      {
                        duplicateMatches.filter((m) =>
                          m.matchedFields.some(
                            (f) => f.fieldName === "company",
                          ),
                        ).length
                      }
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resolution Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Merged to existing</span>
                    <span className="font-medium">
                      {
                        duplicateMatches.filter(
                          (m) => m.resolution?.action === "merge_to_existing",
                        ).length
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Merged to candidate</span>
                    <span className="font-medium">
                      {
                        duplicateMatches.filter(
                          (m) => m.resolution?.action === "merge_to_candidate",
                        ).length
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Kept both</span>
                    <span className="font-medium">
                      {
                        duplicateMatches.filter(
                          (m) => m.resolution?.action === "keep_both",
                        ).length
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Deleted candidate</span>
                    <span className="font-medium">
                      {
                        duplicateMatches.filter(
                          (m) => m.resolution?.action === "delete_candidate",
                        ).length
                      }
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detection Configuration</CardTitle>
              <CardDescription>
                Configure duplicate detection rules and thresholds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">Phone Matching</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={
                          detectionConfig?.phoneMatching.enabled || false
                        }
                      />
                      <Label>Enable phone matching</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={
                          detectionConfig?.phoneMatching.normalizeFormat ||
                          false
                        }
                      />
                      <Label>Normalize phone format</Label>
                    </div>
                    <div>
                      <Label>Country code handling</Label>
                      <Select
                        value={
                          detectionConfig?.phoneMatching.countryCodeHandling ||
                          "flexible"
                        }
                      >
                        <SelectTrigger className="w-[200px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="strict">Strict</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                          <SelectItem value="ignore">Ignore</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Email Matching</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={
                          detectionConfig?.emailMatching.enabled || false
                        }
                      />
                      <Label>Enable email matching</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={
                          detectionConfig?.emailMatching.aliasDetection || false
                        }
                      />
                      <Label>Detect email aliases (e.g., +tags)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={
                          !detectionConfig?.emailMatching.caseSensitive || true
                        }
                      />
                      <Label>Case insensitive matching</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Name Matching</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={detectionConfig?.nameMatching.enabled || false}
                      />
                      <Label>Enable name matching</Label>
                    </div>
                    <div>
                      <Label>Similarity threshold (%)</Label>
                      <Input
                        type="number"
                        value={detectionConfig?.nameMatching.threshold || 85}
                        min="50"
                        max="100"
                        className="w-[100px]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Actions</h4>
                  <div className="space-y-3">
                    <div>
                      <Label>When duplicate found</Label>
                      <Select
                        value={detectionConfig?.onDuplicateFound || "warn"}
                      >
                        <SelectTrigger className="w-[200px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="block">Block creation</SelectItem>
                          <SelectItem value="warn">Show warning</SelectItem>
                          <SelectItem value="merge">Auto-merge</SelectItem>
                          <SelectItem value="create_variant">
                            Create variant
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Auto-merge threshold (%)</Label>
                      <Input
                        type="number"
                        value={detectionConfig?.autoMergeThreshold || 95}
                        min="80"
                        max="100"
                        className="w-[100px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Match Details Dialog */}
      <Dialog open={showMatchDialog} onOpenChange={setShowMatchDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Duplicate Match Details</DialogTitle>
            <DialogDescription>
              Detailed comparison of potential duplicate leads
            </DialogDescription>
          </DialogHeader>

          {selectedMatch && (
            <div className="space-y-4">
              <div className="text-center">
                <div
                  className={`text-3xl font-bold ${getMatchScoreColor(selectedMatch.matchScore)}`}
                >
                  {selectedMatch.matchScore}% Match
                </div>
                <p className="text-muted-foreground">
                  Overall similarity score
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-3">Field Comparison</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Field</TableHead>
                      <TableHead>Candidate Value</TableHead>
                      <TableHead>Existing Value</TableHead>
                      <TableHead>Match Score</TableHead>
                      <TableHead>Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedMatch.matchedFields.map((field) => (
                      <TableRow key={field.fieldName}>
                        <TableCell className="font-medium">
                          {field.fieldName}
                        </TableCell>
                        <TableCell>{String(field.candidateValue)}</TableCell>
                        <TableCell>{String(field.existingValue)}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              field.matchScore >= 90
                                ? "bg-red-100 text-red-800"
                                : field.matchScore >= 75
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {field.matchScore}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{field.matchType}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Detection Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>Detection Method: {selectedMatch.detectionMethod}</div>
                  <div>Match Type: {selectedMatch.matchType}</div>
                  <div>
                    Detected:{" "}
                    {new Date(selectedMatch.detectedAt).toLocaleString()}
                  </div>
                  <div>Status: {selectedMatch.status}</div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMatchDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Merge Dialog */}
      <Dialog open={showMergeDialog} onOpenChange={setShowMergeDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Merge Duplicate Leads</DialogTitle>
            <DialogDescription>
              Choose how to merge these duplicate leads
            </DialogDescription>
          </DialogHeader>

          {selectedMatch && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => handleMergeLeads(selectedMatch.id, true)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">Merge to Existing</CardTitle>
                    <CardDescription>
                      Keep existing lead, merge candidate data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <div>Lead ID: {selectedMatch.existingLeadId}</div>
                      <div className="text-muted-foreground">
                        Recommended for older leads
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => handleMergeLeads(selectedMatch.id, false)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Merge to Candidate
                    </CardTitle>
                    <CardDescription>
                      Keep candidate lead, merge existing data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <div>Lead ID: {selectedMatch.candidateLeadId}</div>
                      <div className="text-muted-foreground">
                        Use for newer, better data
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => handleIgnoreDuplicate(selectedMatch.id)}
                >
                  Keep Both Leads
                </Button>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMergeDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
