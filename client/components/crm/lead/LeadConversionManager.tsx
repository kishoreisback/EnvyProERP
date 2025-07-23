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
  ArrowRight,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Building,
  DollarSign,
  Target,
  AlertCircle,
  RefreshCw,
  Eye,
  Plus,
  Settings,
  Download,
} from "lucide-react";
import { TenantLead } from "./types";
import {
  LeadConversionWorkflow,
  TenantCustomer,
  TenantOpportunity,
  ConversionStep,
} from "./enhanced-types";
import {
  getConversionWorkflowsByTenant,
  getCustomersByTenant,
  getOpportunitiesByTenant,
  canConvertLead,
} from "./enhanced-data";
import { useToast } from "../../ui/use-toast";

interface LeadConversionManagerProps {
  tenantId: string;
  selectedLead?: TenantLead;
  onConversionComplete?: (results: any) => void;
}

export function LeadConversionManager({
  tenantId,
  selectedLead,
  onConversionComplete,
}: LeadConversionManagerProps) {
  const [workflows, setWorkflows] = useState<LeadConversionWorkflow[]>([]);
  const [customers, setCustomers] = useState<TenantCustomer[]>([]);
  const [opportunities, setOpportunities] = useState<TenantOpportunity[]>([]);
  const [showConversionDialog, setShowConversionDialog] = useState(false);
  const [showWorkflowDetails, setShowWorkflowDetails] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] =
    useState<LeadConversionWorkflow | null>(null);
  const [conversionConfig, setConversionConfig] = useState({
    convertTo: [] as string[],
    autoConversion: false,
    requiresApproval: false,
    notifyStakeholders: true,
  });
  const [activeStep, setActiveStep] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    loadConversionData();
  }, [tenantId]);

  const loadConversionData = () => {
    const workflowData = getConversionWorkflowsByTenant(tenantId);
    const customerData = getCustomersByTenant(tenantId);
    const opportunityData = getOpportunitiesByTenant(tenantId);

    setWorkflows(workflowData);
    setCustomers(customerData);
    setOpportunities(opportunityData);
  };

  const handleStartConversion = () => {
    if (!selectedLead) {
      toast({
        title: "No Lead Selected",
        description: "Please select a lead to convert.",
        variant: "destructive",
      });
      return;
    }

    // Check conversion criteria
    const criteria = {
      minimumLeadScore: 70,
      requiredStage: "proposal",
      minimumActivities: 3,
      minimumValue: 100000,
    };

    if (!canConvertLead(selectedLead, criteria)) {
      toast({
        title: "Conversion Criteria Not Met",
        description: "Lead does not meet the minimum conversion requirements.",
        variant: "destructive",
      });
      return;
    }

    setShowConversionDialog(true);
  };

  const executeConversion = async () => {
    if (!selectedLead) return;

    try {
      // Simulate conversion workflow execution
      const workflow: LeadConversionWorkflow = {
        id: `conv_${Date.now()}`,
        tenantId,
        leadId: selectedLead.id,
        convertTo: conversionConfig.convertTo as any,
        autoConversion: conversionConfig.autoConversion,
        conversionCriteria: {
          minimumLeadScore: 70,
          minimumActivities: 3,
        },
        steps: [
          {
            id: "step_1",
            name: "Validate Lead Quality",
            description: "Check if lead meets conversion criteria",
            type: "validation",
            status: "completed",
            order: 1,
            config: {},
            output: { passed: true },
          },
          {
            id: "step_2",
            name: "Create Customer Record",
            description: "Convert lead to customer",
            type: "creation",
            status: conversionConfig.convertTo.includes("customer")
              ? "completed"
              : "skipped",
            order: 2,
            config: {},
            output: conversionConfig.convertTo.includes("customer")
              ? { customerId: `cust_${Date.now()}` }
              : {},
          },
          {
            id: "step_3",
            name: "Create Opportunity",
            description: "Convert lead to opportunity",
            type: "creation",
            status: conversionConfig.convertTo.includes("opportunity")
              ? "completed"
              : "skipped",
            order: 3,
            config: {},
            output: conversionConfig.convertTo.includes("opportunity")
              ? { opportunityId: `opp_${Date.now()}` }
              : {},
          },
          {
            id: "step_4",
            name: "Send Notifications",
            description: "Notify stakeholders",
            type: "notification",
            status: conversionConfig.notifyStakeholders
              ? "completed"
              : "skipped",
            order: 4,
            config: {},
            output: { notificationsSent: 2 },
          },
        ],
        currentStep: 4,
        status: "completed",
        initiatedBy: "current_user",
        initiatedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        requiresApproval: conversionConfig.requiresApproval,
      };

      // Add to workflows
      setWorkflows([...workflows, workflow]);

      // Create customer if selected
      if (conversionConfig.convertTo.includes("customer")) {
        const newCustomer: TenantCustomer = {
          id: `cust_${Date.now()}`,
          tenantId,
          customerId: `CUST-${Date.now()}`,
          firstName: selectedLead.firstName,
          lastName: selectedLead.lastName,
          email: selectedLead.email,
          phone: selectedLead.phone,
          company: selectedLead.company,
          status: "active",
          tier: "bronze",
          lifetimeValue: selectedLead.expectedValue || 0,
          currency: selectedLead.currency,
          convertedFromLeadId: selectedLead.id,
          conversionDate: new Date().toISOString(),
          conversionStage: selectedLead.stage,
          conversionValue: selectedLead.expectedValue,
          totalOrders: 0,
          totalSpent: 0,
          averageOrderValue: 0,
          preferredContactMethod: "email",
          tags: [],
          createdBy: "current_user",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          visibility: "team",
          permissions: {
            canView: ["role:admin", "role:sales_manager"],
            canEdit: ["role:admin", "role:sales_manager"],
            canDelete: ["role:admin"],
            canExport: ["role:admin", "role:sales_manager"],
            canContact: ["role:admin", "role:sales_manager"],
            canManageOrders: ["role:admin", "role:sales_manager"],
          },
        };
        setCustomers([...customers, newCustomer]);
      }

      // Create opportunity if selected
      if (conversionConfig.convertTo.includes("opportunity")) {
        const newOpportunity: TenantOpportunity = {
          id: `opp_${Date.now()}`,
          tenantId,
          opportunityId: `OPP-${Date.now()}`,
          name: `${selectedLead.company || selectedLead.firstName + " " + selectedLead.lastName} - Opportunity`,
          value: selectedLead.expectedValue || 0,
          currency: selectedLead.currency,
          probability: 50,
          weightedValue: (selectedLead.expectedValue || 0) * 0.5,
          stage: "qualification",
          status: "open",
          leadId: selectedLead.id,
          salesProcess: "standard",
          nextSteps: "Follow up on requirements",
          keyStakeholders: [],
          expectedCloseDate: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          createdDate: new Date().toISOString(),
          salesCycleStage: 0,
          totalSalesCycleDays: 0,
          ownerId: selectedLead.assignedTo || "current_user",
          products: [],
          services: [],
          sourceChannel: selectedLead.leadSource.name,
          conversionMetrics: {
            leadToOpportunityDays: 0,
            touchpointsToConversion: selectedLead.activities.length,
            activitiesCount: selectedLead.activities.length,
          },
          tags: [],
          createdBy: "current_user",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          visibility: "team",
          permissions: {
            canView: ["role:admin", "role:sales_manager"],
            canEdit: ["role:admin", "role:sales_manager"],
            canDelete: ["role:admin"],
            canExport: ["role:admin", "role:sales_manager"],
            canManageProducts: ["role:admin", "role:sales_manager"],
            canManageStakeholders: ["role:admin", "role:sales_manager"],
            canUpdateStage: ["role:admin", "role:sales_manager"],
          },
        };
        setOpportunities([...opportunities, newOpportunity]);
      }

      toast({
        title: "Conversion Successful",
        description: `Lead converted successfully to ${conversionConfig.convertTo.join(" and ")}.`,
      });

      setShowConversionDialog(false);
      onConversionComplete?.(workflow);
    } catch (error) {
      toast({
        title: "Conversion Failed",
        description: "Failed to convert lead. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "pending":
      case "in_progress":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStepProgress = (workflow: LeadConversionWorkflow) => {
    const completedSteps = workflow.steps.filter(
      (step) => step.status === "completed",
    ).length;
    return (completedSteps / workflow.steps.length) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Lead Conversion Manager</h2>
          <p className="text-muted-foreground">
            Convert leads to customers and opportunities
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowWorkflowDetails(true)}
          >
            <Settings className="mr-2 h-4 w-4" />
            Configure
          </Button>
          <Button onClick={handleStartConversion} disabled={!selectedLead}>
            <ArrowRight className="mr-2 h-4 w-4" />
            Start Conversion
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Conversions
            </CardTitle>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workflows.length}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Customers Created
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            <p className="text-xs text-muted-foreground">
              {customers.filter((c) => c.status === "active").length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Opportunities Created
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{opportunities.length}</div>
            <p className="text-xs text-muted-foreground">
              {opportunities.filter((o) => o.status === "open").length} open
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹
              {(
                opportunities.reduce((sum, opp) => sum + opp.value, 0) / 100000
              ).toFixed(1)}
              L
            </div>
            <p className="text-xs text-muted-foreground">Pipeline value</p>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Workflows */}
      <Tabs defaultValue="workflows" className="space-y-4">
        <TabsList>
          <TabsTrigger value="workflows">Conversion Workflows</TabsTrigger>
          <TabsTrigger value="customers">Converted Customers</TabsTrigger>
          <TabsTrigger value="opportunities">Created Opportunities</TabsTrigger>
        </TabsList>

        <TabsContent value="workflows" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Conversion Workflows</CardTitle>
              <CardDescription>
                Track the progress of lead conversion workflows
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workflows.map((workflow) => (
                  <div
                    key={workflow.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div>{getStatusIcon(workflow.status)}</div>
                      <div>
                        <p className="font-medium">
                          Lead ID: {workflow.leadId}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Converting to: {workflow.convertTo.join(", ")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {Math.round(getStepProgress(workflow))}% Complete
                        </p>
                        <Progress
                          value={getStepProgress(workflow)}
                          className="w-24"
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedWorkflow(workflow);
                          setShowWorkflowDetails(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {workflows.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No conversion workflows found. Start by converting a lead.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Converted Customers</CardTitle>
              <CardDescription>
                Customers created from lead conversions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Lifetime Value</TableHead>
                    <TableHead>Conversion Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {customer.firstName} {customer.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {customer.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{customer.company || "—"}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            customer.tier === "platinum"
                              ? "default"
                              : customer.tier === "gold"
                                ? "secondary"
                                : customer.tier === "silver"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {customer.tier}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        ₹{(customer.lifetimeValue / 100000).toFixed(1)}L
                      </TableCell>
                      <TableCell>
                        {new Date(customer.conversionDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            customer.status === "active"
                              ? "default"
                              : customer.status === "vip"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {customer.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Created Opportunities</CardTitle>
              <CardDescription>
                Opportunities created from lead conversions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Opportunity</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Probability</TableHead>
                    <TableHead>Expected Close</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {opportunities.map((opportunity) => (
                    <TableRow key={opportunity.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{opportunity.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {opportunity.opportunityId}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        ₹{(opportunity.value / 100000).toFixed(1)}L
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{opportunity.stage}</Badge>
                      </TableCell>
                      <TableCell>{opportunity.probability}%</TableCell>
                      <TableCell>
                        {new Date(
                          opportunity.expectedCloseDate,
                        ).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            opportunity.status === "open"
                              ? "default"
                              : opportunity.status === "won"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {opportunity.status}
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

      {/* Conversion Dialog */}
      <Dialog
        open={showConversionDialog}
        onOpenChange={setShowConversionDialog}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Convert Lead</DialogTitle>
            <DialogDescription>
              Convert {selectedLead?.firstName} {selectedLead?.lastName} to
              customer and/or opportunity
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Convert To</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="convert-customer"
                    checked={conversionConfig.convertTo.includes("customer")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setConversionConfig({
                          ...conversionConfig,
                          convertTo: [
                            ...conversionConfig.convertTo,
                            "customer",
                          ],
                        });
                      } else {
                        setConversionConfig({
                          ...conversionConfig,
                          convertTo: conversionConfig.convertTo.filter(
                            (item) => item !== "customer",
                          ),
                        });
                      }
                    }}
                  />
                  <Label htmlFor="convert-customer">Customer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="convert-opportunity"
                    checked={conversionConfig.convertTo.includes("opportunity")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setConversionConfig({
                          ...conversionConfig,
                          convertTo: [
                            ...conversionConfig.convertTo,
                            "opportunity",
                          ],
                        });
                      } else {
                        setConversionConfig({
                          ...conversionConfig,
                          convertTo: conversionConfig.convertTo.filter(
                            (item) => item !== "opportunity",
                          ),
                        });
                      }
                    }}
                  />
                  <Label htmlFor="convert-opportunity">Opportunity</Label>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={conversionConfig.autoConversion}
                onCheckedChange={(checked) =>
                  setConversionConfig({
                    ...conversionConfig,
                    autoConversion: checked,
                  })
                }
              />
              <Label>Auto-conversion for similar leads</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={conversionConfig.requiresApproval}
                onCheckedChange={(checked) =>
                  setConversionConfig({
                    ...conversionConfig,
                    requiresApproval: checked,
                  })
                }
              />
              <Label>Requires approval</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={conversionConfig.notifyStakeholders}
                onCheckedChange={(checked) =>
                  setConversionConfig({
                    ...conversionConfig,
                    notifyStakeholders: checked,
                  })
                }
              />
              <Label>Notify stakeholders</Label>
            </div>

            {selectedLead && (
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Lead Summary</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    Name: {selectedLead.firstName} {selectedLead.lastName}
                  </div>
                  <div>Company: {selectedLead.company || "—"}</div>
                  <div>
                    Value: ₹
                    {((selectedLead.expectedValue || 0) / 100000).toFixed(1)}L
                  </div>
                  <div>Score: {selectedLead.score}/100</div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConversionDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={executeConversion}
              disabled={conversionConfig.convertTo.length === 0}
            >
              Start Conversion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Workflow Details Dialog */}
      <Dialog open={showWorkflowDetails} onOpenChange={setShowWorkflowDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Workflow Details</DialogTitle>
            <DialogDescription>
              {selectedWorkflow
                ? `Conversion workflow for Lead ${selectedWorkflow.leadId}`
                : "Conversion workflow configuration"}
            </DialogDescription>
          </DialogHeader>

          {selectedWorkflow && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Status</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    {getStatusIcon(selectedWorkflow.status)}
                    <span className="capitalize">
                      {selectedWorkflow.status}
                    </span>
                  </div>
                </div>
                <div>
                  <Label>Converting To</Label>
                  <div className="mt-1">
                    {selectedWorkflow.convertTo.map((type) => (
                      <Badge key={type} variant="outline" className="mr-1">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <Label>Workflow Steps</Label>
                <div className="space-y-2 mt-2">
                  {selectedWorkflow.steps.map((step, index) => (
                    <div
                      key={step.id}
                      className="flex items-center space-x-3 p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">
                          {index + 1}
                        </div>
                        {getStatusIcon(step.status)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{step.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                      <Badge variant="outline">{step.type}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {selectedWorkflow.status === "completed" && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">
                    Conversion Results
                  </h4>
                  <div className="text-sm text-green-700">
                    {selectedWorkflow.createdCustomerId && (
                      <div>
                        ✓ Customer created: {selectedWorkflow.createdCustomerId}
                      </div>
                    )}
                    {selectedWorkflow.createdOpportunityId && (
                      <div>
                        ✓ Opportunity created:{" "}
                        {selectedWorkflow.createdOpportunityId}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowWorkflowDetails(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
