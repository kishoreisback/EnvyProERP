import React, { useMemo } from "react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../ui/dialog";
import {
  User,
  Building2,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Calendar,
  Target,
  Activity,
  Star,
  Thermometer,
  Edit,
  X,
  Clock,
  TrendingUp,
  Users,
  FileText,
  ExternalLink,
} from "lucide-react";
import { Lead, LeadStatus, LeadPriority } from "./types";
import { salesTeam } from "./data";

interface LeadViewProps {
  lead: Lead;
  onClose: () => void;
  onEdit: () => void;
}

export function LeadView({ lead, onClose, onEdit }: LeadViewProps) {
  // Memoize expensive date calculations
  const formattedDates = useMemo(
    () => ({
      created: new Date(lead.createdAt).toLocaleString(),
      updated: new Date(lead.updatedAt).toLocaleString(),
      lastContacted: lead.lastContactedAt
        ? new Date(lead.lastContactedAt).toLocaleString()
        : null,
      nextFollowUp: lead.nextFollowUpDate
        ? new Date(lead.nextFollowUpDate).toLocaleString()
        : null,
    }),
    [
      lead.createdAt,
      lead.updatedAt,
      lead.lastContactedAt,
      lead.nextFollowUpDate,
    ],
  );

  // Memoize assigned sales person lookup
  const assignedSalesPerson = useMemo(
    () => salesTeam.find((s) => s.id === lead.assignedTo),
    [lead.assignedTo],
  );

  const getStatusBadge = (status: LeadStatus) => {
    const variants = {
      new: "bg-blue-100 text-blue-800",
      contacted: "bg-yellow-100 text-yellow-800",
      qualified: "bg-green-100 text-green-800",
      proposal: "bg-purple-100 text-purple-800",
      negotiation: "bg-orange-100 text-orange-800",
      won: "bg-emerald-100 text-emerald-800",
      lost: "bg-red-100 text-red-800",
      nurturing: "bg-indigo-100 text-indigo-800",
      on_hold: "bg-gray-100 text-gray-800",
    };

    return (
      <Badge className={variants[status]}>
        {status.replace("_", " ").toUpperCase()}
      </Badge>
    );
  };

  const getPriorityIcon = (priority: LeadPriority) => {
    const icons = {
      low: <Star className="h-4 w-4 text-gray-400" />,
      medium: <Star className="h-4 w-4 text-yellow-500" />,
      high: <Star className="h-4 w-4 text-orange-500" />,
      urgent: <Star className="h-4 w-4 text-red-500 fill-current" />,
    };
    return icons[priority];
  };

  const getTemperatureIcon = (temperature: string) => {
    const colors = {
      hot: "text-red-500",
      warm: "text-orange-500",
      cold: "text-blue-500",
    };
    return (
      <Thermometer
        className={`h-4 w-4 ${colors[temperature as keyof typeof colors]}`}
      />
    );
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          {lead.firstName} {lead.lastName}
        </DialogTitle>
        <DialogDescription>
          Lead details and complete information
        </DialogDescription>
      </DialogHeader>

      <div className="max-h-[70vh] overflow-y-auto">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="tracking">Tracking</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Lead Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Status:</span>
                    {getStatusBadge(lead.status)}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Priority:</span>
                    <div className="flex items-center gap-1">
                      {getPriorityIcon(lead.priority)}
                      <span className="capitalize">{lead.priority}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Temperature:</span>
                    <div className="flex items-center gap-2">
                      {getTemperatureIcon(lead.temperature)}
                      <span className="capitalize">{lead.temperature}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Lead Score:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${lead.score}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">
                        {lead.score}/100
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Conversion Probability:
                    </span>
                    <span className="font-medium text-green-600">
                      {lead.conversionProbability}%
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Sales Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Expected Value:</span>
                    <span className="font-medium text-green-600">
                      ₹{(lead.expectedValue || 0).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Budget Range:</span>
                    <span className="text-sm">
                      {lead.budget
                        ? `₹${lead.budget.min?.toLocaleString()} - ₹${lead.budget.max?.toLocaleString()}`
                        : "Not specified"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Timeline:</span>
                    <span className="text-sm">
                      {lead.timeline || "Not specified"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Days in Pipeline:
                    </span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {lead.daysInPipeline} days
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Assigned To:</span>
                    <span className="text-sm">
                      {assignedSalesPerson?.name || "Unassigned"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Lead Source & Tracking
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <span className="text-sm font-medium">Lead Source:</span>
                    <div className="mt-1">
                      <Badge variant="outline">{lead.leadSource.name}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {lead.leadSource.description}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm font-medium">
                      Source Performance:
                    </span>
                    <div className="mt-1 text-sm">
                      <div>
                        Conversion Rate: {lead.leadSource.conversionRate}%
                      </div>
                      <div>Total Leads: {lead.leadSource.totalLeads}</div>
                    </div>
                  </div>
                </div>

                {(lead.campaignId || lead.utmSource) && (
                  <div className="border-t pt-4">
                    <h5 className="font-medium mb-2">Campaign Details</h5>
                    <div className="grid gap-2 md:grid-cols-2 text-sm">
                      {lead.campaignId && (
                        <div>
                          Campaign ID:{" "}
                          <span className="font-medium">{lead.campaignId}</span>
                        </div>
                      )}
                      {lead.utmSource && (
                        <div>
                          UTM Source:{" "}
                          <span className="font-medium">{lead.utmSource}</span>
                        </div>
                      )}
                      {lead.utmMedium && (
                        <div>
                          UTM Medium:{" "}
                          <span className="font-medium">{lead.utmMedium}</span>
                        </div>
                      )}
                      {lead.utmCampaign && (
                        <div>
                          UTM Campaign:{" "}
                          <span className="font-medium">
                            {lead.utmCampaign}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Information Tab */}
          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Contact Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className="text-sm font-medium">Name:</Label>
                    <p className="text-lg font-medium">
                      {lead.firstName} {lead.lastName}
                    </p>
                    {lead.designation && (
                      <p className="text-sm text-muted-foreground">
                        {lead.designation}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Email:</Label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {lead.email}
                      </a>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      Primary Phone:
                    </Label>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`tel:${lead.phone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {lead.phone}
                      </a>
                    </div>
                  </div>

                  {lead.alternatePhone && (
                    <div>
                      <Label className="text-sm font-medium">
                        Alternate Phone:
                      </Label>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={`tel:${lead.alternatePhone}`}
                          className="text-blue-600 hover:underline"
                        >
                          {lead.alternatePhone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {lead.address && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <address className="not-italic">
                    {lead.address.street}
                    <br />
                    {lead.address.city}, {lead.address.state}{" "}
                    {lead.address.pincode}
                    <br />
                    {lead.address.country}
                  </address>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Created:</span>
                  <span className="text-sm">{formattedDates.created}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Last Updated:</span>
                  <span className="text-sm">{formattedDates.updated}</span>
                </div>
                {formattedDates.lastContacted && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Last Contacted:</span>
                    <span className="text-sm">
                      {formattedDates.lastContacted}
                    </span>
                  </div>
                )}
                {formattedDates.nextFollowUp && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Next Follow-up:</span>
                    <span className="text-sm font-medium text-orange-600">
                      {formattedDates.nextFollowUp}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Company Information Tab */}
          <TabsContent value="company" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {lead.company ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label className="text-sm font-medium">
                        Company Name:
                      </Label>
                      <p className="text-lg font-medium">{lead.company}</p>
                    </div>

                    {lead.industry && (
                      <div>
                        <Label className="text-sm font-medium">Industry:</Label>
                        <p className="text-lg">{lead.industry}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No company information available
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Requirements Tab */}
          <TabsContent value="requirements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Requirements & Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                {lead.requirements ? (
                  <p className="whitespace-pre-wrap">{lead.requirements}</p>
                ) : (
                  <p className="text-muted-foreground">
                    No requirements specified
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Budget & Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className="text-sm font-medium">
                      Expected Value:
                    </Label>
                    <p className="text-xl font-semibold text-green-600">
                      ₹{(lead.expectedValue || 0).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Budget Range:</Label>
                    <p className="text-lg">
                      {lead.budget
                        ? `₹${lead.budget.min?.toLocaleString()} - ₹${lead.budget.max?.toLocaleString()}`
                        : "Not specified"}
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Timeline:</Label>
                    <p className="text-lg">
                      {lead.timeline || "Not specified"}
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Currency:</Label>
                    <p className="text-lg">{lead.currency}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tracking Tab */}
          <TabsContent value="tracking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Lead Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {lead.score}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Lead Score
                    </div>
                  </div>

                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {lead.conversionProbability}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Conversion Probability
                    </div>
                  </div>

                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {lead.daysInPipeline}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Days in Pipeline
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Campaign Attribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {lead.campaignId && (
                    <div>
                      <Label className="text-sm font-medium">
                        Campaign ID:
                      </Label>
                      <p className="font-mono text-sm">{lead.campaignId}</p>
                    </div>
                  )}

                  {lead.utmSource && (
                    <div>
                      <Label className="text-sm font-medium">UTM Source:</Label>
                      <p className="text-sm">{lead.utmSource}</p>
                    </div>
                  )}

                  {lead.utmMedium && (
                    <div>
                      <Label className="text-sm font-medium">UTM Medium:</Label>
                      <p className="text-sm">{lead.utmMedium}</p>
                    </div>
                  )}

                  {lead.utmCampaign && (
                    <div>
                      <Label className="text-sm font-medium">
                        UTM Campaign:
                      </Label>
                      <p className="text-sm">{lead.utmCampaign}</p>
                    </div>
                  )}
                </div>

                {!lead.campaignId && !lead.utmSource && (
                  <p className="text-muted-foreground">
                    No campaign attribution data available
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          <X className="h-4 w-4 mr-2" />
          Close
        </Button>
        <Button onClick={onEdit}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Lead
        </Button>
      </DialogFooter>
    </>
  );
}

function Label({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={`text-sm font-medium ${className}`}>{children}</span>;
}
