import React, { useState } from "react";
import { MainLayout } from "../components/layout/MainLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  AnimatedIcon,
  GlowingOrb,
  ShimmerEffect,
} from "../components/ui/animated-icons";
import {
  Settings,
  Zap,
  Mail,
  TrendingUp,
  MessageSquare,
  Map,
  FileSignature,
  Cloud,
  Building2,
  Activity,
  Plus,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { IntegrationsDashboard } from "../components/integrations/IntegrationsDashboard";
import { MarketingIntegrations } from "../components/integrations/MarketingIntegrations";
import { CRMIntegrations } from "../components/integrations/CRMIntegrations";
import { CommunicationIntegrations } from "../components/integrations/CommunicationIntegrations";
import { Integration } from "../components/integrations/types";

export default function IntegrationsDemo() {
  const [selectedIntegration, setSelectedIntegration] =
    useState<Integration | null>(null);
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const handleConfigureIntegration = (integration: Integration) => {
    setSelectedIntegration(integration);
    setShowConfigDialog(true);
  };

  const handleTestIntegration = (integration: Integration) => {
    // Mock test integration
    console.log("Testing integration:", integration.name);
    // You could show a toast notification here
  };

  const handleCloseConfig = () => {
    setShowConfigDialog(false);
    setSelectedIntegration(null);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Navigation */}
        <div className="flex items-center gap-4 animate-slideInLeft">
          <Button variant="outline" className="hover-lift" asChild>
            <Link to="/advanced-patterns">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Advanced Patterns
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">
                Third-Party Integrations
              </h1>
              <GlowingOrb className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Zap}
                animation="glow"
                className="text-primary"
              />
              <p className="text-muted-foreground">
                Connect and manage your business integrations with marketing,
                sales, ERP, and communication platforms
              </p>
            </div>
          </div>
          <Button className="hover-lift animate-gradient bg-gradient-to-r from-primary to-blue-600 relative overflow-hidden animate-slideInRight">
            <AnimatedIcon icon={Plus} animation="bounce" className="mr-2" />
            Add Integration
            <ShimmerEffect className="absolute inset-0" />
          </Button>
        </div>

        {/* Key Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover-lift animate-fadeInUp">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Marketing</h3>
                  <p className="text-sm text-muted-foreground">
                    Email & SMS campaigns
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
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Sales Automation</h3>
                  <p className="text-sm text-muted-foreground">
                    CRM & pipeline sync
                  </p>
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
                  <MessageSquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Communication</h3>
                  <p className="text-sm text-muted-foreground">
                    SMS & WhatsApp API
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
                  <FileSignature className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Digital Signatures</h3>
                  <p className="text-sm text-muted-foreground">
                    Document signing
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="maps">Maps & Location</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <IntegrationsDashboard
              onConfigureIntegration={handleConfigureIntegration}
              onTestIntegration={handleTestIntegration}
            />
          </TabsContent>

          <TabsContent value="marketing">
            <MarketingIntegrations />
          </TabsContent>

          <TabsContent value="sales">
            <CRMIntegrations />
          </TabsContent>

          <TabsContent value="communication">
            <CommunicationIntegrations />
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Document Management</CardTitle>
                <CardDescription>
                  Digital signatures and cloud storage integrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileSignature className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Document Solutions
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    DocuSign, Zoho Sign for signatures and Google Drive, Dropbox
                    for storage
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Document Integration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maps">
            <Card>
              <CardHeader>
                <CardTitle>Maps & Location Services</CardTitle>
                <CardDescription>
                  Google Maps integration for geo-tagging and location services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Map className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Location Services
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Geo-tag leads, track site visits, and manage location-based
                    data
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Maps Integration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Configuration Dialog */}
        <Dialog open={showConfigDialog} onOpenChange={handleCloseConfig}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configure {selectedIntegration?.name}
              </DialogTitle>
              <DialogDescription>
                Manage settings and configuration for{" "}
                {selectedIntegration?.name} integration
              </DialogDescription>
            </DialogHeader>
            {selectedIntegration && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <span className="text-2xl">{selectedIntegration.icon}</span>
                  <div>
                    <h3 className="font-medium">{selectedIntegration.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedIntegration.description}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-2">Connection Status</h4>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          selectedIntegration.status === "connected"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      />
                      <span className="capitalize">
                        {selectedIntegration.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Last Sync</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedIntegration.lastSync
                        ? new Date(
                            selectedIntegration.lastSync,
                          ).toLocaleString()
                        : "Never"}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedIntegration.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 bg-muted rounded-md text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedIntegration.usage && (
                  <div>
                    <h4 className="font-medium mb-2">Usage Statistics</h4>
                    <div className="grid gap-2 md:grid-cols-3">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          API Calls
                        </p>
                        <p className="font-medium">
                          {selectedIntegration.usage.apiCalls.toLocaleString()}{" "}
                          /{" "}
                          {selectedIntegration.usage.apiLimit.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Data Transfer
                        </p>
                        <p className="font-medium">
                          {selectedIntegration.usage.dataTransferred}MB
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Errors</p>
                        <p className="font-medium">
                          {selectedIntegration.usage.errors}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={handleCloseConfig}>
                    Close
                  </Button>
                  <Button
                    onClick={() => handleTestIntegration(selectedIntegration)}
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    Test Connection
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Implementation Notes */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Implementation Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Available Integrations</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • <strong>Marketing:</strong> Mailchimp, Interakt, Zoho
                    Campaigns
                  </li>
                  <li>
                    • <strong>Sales:</strong> Salesforce, Pipedrive sync
                  </li>
                  <li>
                    • <strong>ERP:</strong> SAP/Oracle (enterprise)
                  </li>
                  <li>
                    • <strong>Communication:</strong> MSG91, Twilio, Gupshup
                  </li>
                  <li>
                    • <strong>Maps:</strong> Google Maps API geo-tagging
                  </li>
                  <li>
                    • <strong>Signatures:</strong> DocuSign, Zoho Sign
                  </li>
                  <li>
                    • <strong>Storage:</strong> Google Drive, Dropbox
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Real-time and scheduled data synchronization</li>
                  <li>• API usage monitoring and rate limiting</li>
                  <li>• Webhook support for real-time updates</li>
                  <li>• Error handling and retry mechanisms</li>
                  <li>• Integration health monitoring</li>
                  <li>• Mock data and workflows for testing</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
