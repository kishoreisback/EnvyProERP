import React, { useState } from "react";
import { MainLayout } from "../components/layout/MainLayout";
import {
  TenantProvider,
  useTenant,
  TenantDashboard,
  TenantManagement,
  FeatureToggle,
} from "../components/advanced/multi-tenant";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  Building2,
  Shield,
  Settings,
  Users,
  TrendingUp,
  Palette,
  ToggleLeft,
  Lock,
  Globe,
  BarChart3,
  ArrowRight,
  Check,
  X,
  Eye,
  Star,
} from "lucide-react";
import { useToast } from "../components/ui/use-toast";

const TenantSelector = () => {
  const { currentTenant, tenants, switchTenant } = useTenant();
  const { toast } = useToast();

  const handleTenantSwitch = (tenantId: string) => {
    switchTenant(tenantId);
    toast({
      title: "Tenant Switched",
      description: `Switched to ${tenants[tenantId]?.name}`,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Switch Tenant</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.values(tenants).map((tenant) => (
          <Card
            key={tenant.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              currentTenant?.id === tenant.id
                ? "ring-2 ring-primary border-primary"
                : ""
            }`}
            onClick={() => handleTenantSwitch(tenant.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: tenant.branding.primaryColor }}
                >
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{tenant.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {tenant.domain}
                  </p>
                </div>
                <Badge
                  variant={
                    tenant.plan === "enterprise" ? "default" : "secondary"
                  }
                >
                  {tenant.plan}
                </Badge>
                {currentTenant?.id === tenant.id && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const FeatureComparison = () => {
  const { tenants } = useTenant();

  const features = [
    {
      name: "Basic Dashboard",
      basic: true,
      professional: true,
      enterprise: true,
    },
    {
      name: "Advanced Analytics",
      basic: false,
      professional: true,
      enterprise: true,
    },
    {
      name: "Custom Branding",
      basic: false,
      professional: true,
      enterprise: true,
    },
    { name: "API Access", basic: false, professional: true, enterprise: true },
    {
      name: "Multi-Language",
      basic: false,
      professional: false,
      enterprise: true,
    },
    {
      name: "Priority Support",
      basic: false,
      professional: false,
      enterprise: true,
    },
    {
      name: "Custom Integrations",
      basic: false,
      professional: false,
      enterprise: true,
    },
    {
      name: "Advanced Security",
      basic: false,
      professional: false,
      enterprise: true,
    },
    {
      name: "White Label",
      basic: false,
      professional: false,
      enterprise: true,
    },
    {
      name: "Unlimited Users",
      basic: false,
      professional: false,
      enterprise: true,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Feature Comparison</h3>
      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-4 font-medium">Features</th>
              <th className="text-center p-4 font-medium">Basic</th>
              <th className="text-center p-4 font-medium">Professional</th>
              <th className="text-center p-4 font-medium">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr
                key={feature.name}
                className={index % 2 === 0 ? "bg-muted/20" : ""}
              >
                <td className="p-4 font-medium">{feature.name}</td>
                <td className="text-center p-4">
                  {feature.basic ? (
                    <Check className="h-4 w-4 text-green-500 mx-auto" />
                  ) : (
                    <X className="h-4 w-4 text-red-500 mx-auto" />
                  )}
                </td>
                <td className="text-center p-4">
                  {feature.professional ? (
                    <Check className="h-4 w-4 text-green-500 mx-auto" />
                  ) : (
                    <X className="h-4 w-4 text-red-500 mx-auto" />
                  )}
                </td>
                <td className="text-center p-4">
                  {feature.enterprise ? (
                    <Check className="h-4 w-4 text-green-500 mx-auto" />
                  ) : (
                    <X className="h-4 w-4 text-red-500 mx-auto" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DataIsolationDemo = () => {
  const { currentTenant } = useTenant();

  const sampleData = {
    "builder-construction": {
      projects: ["Skyline Tower", "Green Valley Homes", "Metro Plaza"],
      users: ["John Smith", "Sarah Connor", "Mike Johnson"],
      revenue: "$2.4M",
      documents: 1247,
    },
    "tech-innovations": {
      projects: ["AI Platform", "Mobile App", "Web Portal"],
      users: ["Alice Brown", "Bob Wilson", "Carol Davis"],
      revenue: "$1.8M",
      documents: 892,
    },
  };

  const data = currentTenant
    ? sampleData[currentTenant.id as keyof typeof sampleData]
    : null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Data Isolation Demo</h3>
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Data is completely isolated between tenants. Each organization only
          sees their own data.
        </AlertDescription>
      </Alert>

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Projects</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold">{data.projects.length}</div>
                <ul className="text-xs text-muted-foreground mt-1">
                  {data.projects.map((project, index) => (
                    <li key={index}>• {project}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Active Users</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold">{data.users.length}</div>
                <ul className="text-xs text-muted-foreground mt-1">
                  {data.users.map((user, index) => (
                    <li key={index}>• {user}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Revenue</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold">{data.revenue}</div>
                <p className="text-xs text-muted-foreground">This quarter</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Documents</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold">{data.documents}</div>
                <p className="text-xs text-muted-foreground">Total stored</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

const BrandingDemo = () => {
  const { currentTenant } = useTenant();

  if (!currentTenant) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Custom Branding</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Color Scheme
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded border"
                style={{ backgroundColor: currentTenant.branding.primaryColor }}
              />
              <div>
                <p className="font-medium">Primary Color</p>
                <p className="text-sm text-muted-foreground">
                  {currentTenant.branding.primaryColor}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded border"
                style={{
                  backgroundColor: currentTenant.branding.secondaryColor,
                }}
              />
              <div>
                <p className="font-medium">Secondary Color</p>
                <p className="text-sm text-muted-foreground">
                  {currentTenant.branding.secondaryColor}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Organization Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">Company Name</p>
              <p className="text-sm text-muted-foreground">
                {currentTenant.name}
              </p>
            </div>
            <div>
              <p className="font-medium">Domain</p>
              <p className="text-sm text-muted-foreground">
                {currentTenant.domain}
              </p>
            </div>
            <div>
              <p className="font-medium">Plan</p>
              <Badge
                variant={
                  currentTenant.plan === "enterprise" ? "default" : "secondary"
                }
              >
                {currentTenant.plan}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const FeatureToggleDemo = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Feature Toggle Demo</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FeatureToggle
          featureName="advancedAnalytics"
          fallback={
            <Card className="opacity-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="h-4 w-4" />
                  <span className="font-medium">Advanced Analytics</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Upgrade to Professional or Enterprise
                </p>
              </CardContent>
            </Card>
          }
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-4 w-4 text-green-500" />
                <span className="font-medium">Advanced Analytics</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Detailed insights and reports
              </p>
            </CardContent>
          </Card>
        </FeatureToggle>

        <FeatureToggle
          featureName="apiAccess"
          fallback={
            <Card className="opacity-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="h-4 w-4" />
                  <span className="font-medium">API Access</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Upgrade to Professional or Enterprise
                </p>
              </CardContent>
            </Card>
          }
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="h-4 w-4 text-green-500" />
                <span className="font-medium">API Access</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Full REST API integration
              </p>
            </CardContent>
          </Card>
        </FeatureToggle>

        <FeatureToggle
          featureName="whiteLabel"
          fallback={
            <Card className="opacity-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="h-4 w-4" />
                  <span className="font-medium">White Label</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Enterprise only feature
                </p>
              </CardContent>
            </Card>
          }
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 text-green-500" />
                <span className="font-medium">White Label</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Complete branding customization
              </p>
            </CardContent>
          </Card>
        </FeatureToggle>
      </div>
    </div>
  );
};

function MultiTenantDemoContent() {
  const [activeTab, setActiveTab] = useState("overview");
  const { currentTenant } = useTenant();

  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Multi-Tenant Architecture</h1>
            <p className="text-muted-foreground mt-2">
              Complete data separation, custom branding, and feature toggles per
              organization
            </p>
          </div>
          {currentTenant && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: currentTenant.branding.primaryColor }}
              />
              <span className="font-medium">{currentTenant.name}</span>
              <Badge variant="outline">{currentTenant.plan}</Badge>
            </div>
          )}
        </div>

        <Separator />

        {/* Key Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                  <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Data Isolation</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete separation
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                  <Palette className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Custom Branding</h3>
                  <p className="text-sm text-muted-foreground">
                    White-label ready
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
                  <ToggleLeft className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Feature Toggles</h3>
                  <p className="text-sm text-muted-foreground">
                    Plan-based access
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900">
                  <BarChart3 className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Usage Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    Per-tenant tracking
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
            <TabsTrigger value="switching">Tenant Switch</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="data">Data Isolation</TabsTrigger>
            <TabsTrigger value="management">Management</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BrandingDemo />
              <FeatureToggleDemo />
            </div>
          </TabsContent>

          <TabsContent value="switching">
            <TenantSelector />
          </TabsContent>

          <TabsContent value="features">
            <FeatureComparison />
          </TabsContent>

          <TabsContent value="data">
            <DataIsolationDemo />
          </TabsContent>

          <TabsContent value="management">
            <TenantManagement />
          </TabsContent>

          <TabsContent value="dashboard">
            <TenantDashboard />
          </TabsContent>
        </Tabs>

        {/* Implementation Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Implementation Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Architecture</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• React Context for tenant management</li>
                  <li>• Automatic subdomain detection</li>
                  <li>• HOC-based feature gating</li>
                  <li>• Dynamic theme application</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Security</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Complete data isolation</li>
                  <li>• Role-based access control</li>
                  <li>• Audit logging per tenant</li>
                  <li>• Encrypted configurations</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

export default function MultiTenantDemo() {
  return (
    <TenantProvider>
      <MultiTenantDemoContent />
    </TenantProvider>
  );
}
