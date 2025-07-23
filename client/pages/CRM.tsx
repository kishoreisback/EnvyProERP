import { MainLayout } from "@/components/layout/MainLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AnimatedIcon, GlowingOrb } from "@/components/ui/animated-icons";
import {
  Users,
  Plus,
  Heart,
  Target,
  Phone,
  TrendingUp,
  Zap,
  Building,
  BarChart3,
  MessageSquare,
  FileText,
  Bot,
  Megaphone,
  UserCheck,
  Home,
  Building2,
  Layers3,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  PermissionProvider,
  usePermissions,
} from "@/components/user-management/PermissionProvider";
import { TenantUser } from "@/components/user-management/types";
import { availableTenants } from "@/components/crm/constants";

function CRMContent() {
  const { user: currentUser, hasPermission, isTenantAdmin } = usePermissions();
  const [selectedTenant, setSelectedTenant] = useState<string>(
    availableTenants[0].id,
  );
  const [tenantData, setTenantData] = useState(availableTenants[0]);
  const [modals, setModals] = useState({
    scheduleCall: false,
    createProposal: false,
    addClient: false,
  });

  // Update tenant data when selection changes
  useEffect(() => {
    const tenant = availableTenants.find((t) => t.id === selectedTenant);
    if (tenant) {
      setTenantData(tenant);
    }
  }, [selectedTenant]);

  // Check if user is Super Admin
  const isSuperAdmin =
    currentUser?.role === "super_admin" || currentUser?.tenantRole === "owner";

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Tenant Selection Header - Only for Super Admin */}
        {isSuperAdmin && (
          <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50/50 to-transparent animate-fadeInUp">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-gray-900">
                      Super Admin View
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-blue-100 text-blue-700 border-blue-300"
                    >
                      Multi-Tenant Access
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      Select Tenant:
                    </span>
                    <Select
                      value={selectedTenant}
                      onValueChange={setSelectedTenant}
                    >
                      <SelectTrigger className="w-64">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTenants.map((tenant) => (
                          <SelectItem key={tenant.id} value={tenant.id}>
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-3 h-3 rounded-full ${tenant.color}`}
                              />
                              <div>
                                <div className="font-medium">{tenant.name}</div>
                                <div className="text-xs text-gray-500">
                                  {tenant.type}
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Link to="/crm/tenant/overview">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Layers3 className="h-4 w-4 mr-2" />
                    View Tenant CRM
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tenant Details Card - Only for Super Admin */}
        {isSuperAdmin && (
          <Card className="animate-fadeInUp border-dashed border-2 border-blue-200 bg-blue-50/30">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-4 h-4 rounded-full ${tenantData.color}`}
                    />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {tenantData.name}
                    </h3>
                    <Badge
                      variant="outline"
                      className="bg-blue-100 text-blue-700"
                    >
                      {tenantData.type}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Industry:</span>
                      <span className="font-medium">
                        {tenantData.industry.replace("_", " ").toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Leads:</span>
                      <span className="font-medium text-blue-600">
                        {tenantData.stats.totalLeads}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Deals:</span>
                      <span className="font-medium text-green-600">
                        {tenantData.stats.activeDeals}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pipeline Value:</span>
                      <span className="font-medium text-purple-600">
                        {tenantData.stats.pipelineValue}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center space-y-3">
                  <p className="text-sm text-gray-600 mb-2">
                    Access the full tenant-driven CRM experience with
                    comprehensive lead management, tenant-specific analytics,
                    and advanced filtering capabilities.
                  </p>
                  <Link to={`/crm/tenant/overview?tenant=${selectedTenant}`}>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Building2 className="h-4 w-4 mr-2" />
                      Open Tenant CRM Dashboard
                    </Button>
                  </Link>
                  <div className="text-xs text-center text-gray-500">
                    Full tenant isolation • Advanced analytics • Custom
                    workflows
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Current Tenant Info */}
        <div className="flex items-center justify-between animate-slideInDown">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${tenantData.color}`} />
              <h1 className="text-3xl font-bold gradient-text">
                {isSuperAdmin
                  ? `${tenantData.name} - CRM Dashboard`
                  : "CRM Dashboard"}
              </h1>
              <GlowingOrb className="animate-pulse" />
              {isSuperAdmin && (
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700"
                >
                  {tenantData.type}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <AnimatedIcon
                icon={Heart}
                animation="pulse"
                className="text-emerald-600"
              />
              <p className="text-muted-foreground">
                {isSuperAdmin
                  ? `Managing ${tenantData.name} - ${tenantData.type} Industry CRM`
                  : "Specialized CRM for Construction, Real Estate, Manufacturing & Marketing Industries"}
              </p>
            </div>
          </div>
          <button
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-md hover:from-emerald-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg cursor-pointer"
            onClick={() => {
              setModals((prev) => ({ ...prev, addClient: true }));
            }}
          >
            <Plus className="h-4 w-4 mr-2 inline" />
            Add Client
          </button>
        </div>

        <Card className="hover-lift animate-fadeInUp relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-primary/5 pointer-events-none" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AnimatedIcon
                icon={Users}
                animation="bounce"
                className="text-emerald-600"
                size="lg"
              />
              Industry-Specialized CRM
            </CardTitle>
            <CardDescription>
              Comprehensive CRM tailored for Construction, Real Estate,
              Manufacturing & Marketing industries
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Link to="/crm/clients" className="block">
                <div className="rounded-lg border p-4 hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center gap-2 mb-2">
                    <AnimatedIcon
                      icon={Users}
                      animation="bounce"
                      className="text-emerald-600"
                    />
                    <h3 className="font-semibold">Clients</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Comprehensive client lifecycle management with projects and
                    financials
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                      Lifecycle
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      Projects
                    </span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                      Financials
                    </span>
                  </div>
                </div>
              </Link>

              <Link to="/crm/customers" className="block">
                <div
                  className="rounded-lg border p-4 hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer"
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center gap-2 mb-2">
                    <AnimatedIcon
                      icon={Heart}
                      animation="float"
                      className="text-pink-600"
                    />
                    <h3 className="font-semibold">Customers</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Customer experience management with satisfaction and loyalty
                    tracking
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded">
                      Experience
                    </span>
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                      Satisfaction
                    </span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                      Loyalty
                    </span>
                  </div>
                </div>
              </Link>

              <Link to="/crm/leads" className="block">
                <div
                  className="rounded-lg border p-4 hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center gap-2 mb-2">
                    <AnimatedIcon
                      icon={Target}
                      animation="pulse"
                      className="text-blue-600"
                    />
                    <h3 className="font-semibold">Lead Management</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Comprehensive lead capture, scoring, and nurturing system
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      Capture
                    </span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      Scoring
                    </span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                      Nurturing
                    </span>
                  </div>
                </div>
              </Link>

              <Link to="/crm/contacts" className="block">
                <div
                  className="rounded-lg border p-4 hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center gap-2 mb-2">
                    <AnimatedIcon
                      icon={UserCheck}
                      animation="float"
                      className="text-teal-600"
                    />
                    <h3 className="font-semibold">
                      Contact & Account Management
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Full contact lifecycle with B2B hierarchies and family
                    associations
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded">
                      Contacts
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      Accounts
                    </span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                      Families
                    </span>
                  </div>
                </div>
              </Link>

              <Link to="/crm/properties" className="block">
                <div
                  className="rounded-lg border p-4 hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center gap-2 mb-2">
                    <AnimatedIcon
                      icon={Building}
                      animation="glow"
                      className="text-purple-600"
                    />
                    <h3 className="font-semibold">Property & Asset Catalog</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Master inventory with pricing, availability, and CRM
                    integration
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                      Inventory
                    </span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      Pricing
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      Towers
                    </span>
                  </div>
                </div>
              </Link>

              <Link to="/crm/deals" className="block">
                <div
                  className="rounded-lg border p-4 hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer"
                  style={{ animationDelay: "0.5s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center gap-2 mb-2">
                    <AnimatedIcon
                      icon={TrendingUp}
                      animation="bounce"
                      className="text-orange-600"
                    />
                    <h3 className="font-semibold">
                      Opportunity & Deal Management
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Complete sales pipeline with deal tracking and revenue
                    forecasting
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                      Pipeline
                    </span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      Deals
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      Forecasting
                    </span>
                  </div>
                </div>
              </Link>

              <Link to="/crm/sales-automation" className="block">
                <div
                  className="rounded-lg border p-4 hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer"
                  style={{ animationDelay: "0.6s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center gap-2 mb-2">
                    <AnimatedIcon
                      icon={Bot}
                      animation="pulse"
                      className="text-blue-600"
                    />
                    <h3 className="font-semibold">Sales Automation</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Automated customer journey, follow-ups, and lead nurturing
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      Automation
                    </span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      Templates
                    </span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                      Workflows
                    </span>
                  </div>
                </div>
              </Link>

              <Link to="/crm/marketing-automation" className="block">
                <div
                  className="rounded-lg border p-4 hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer"
                  style={{ animationDelay: "0.7s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center gap-2 mb-2">
                    <AnimatedIcon
                      icon={Megaphone}
                      animation="bounce"
                      className="text-indigo-600"
                    />
                    <h3 className="font-semibold">Marketing Automation</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Project-specific campaigns, email designer, and ROI tracking
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                      Campaigns
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      Journeys
                    </span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      ROI Tracking
                    </span>
                  </div>
                </div>
              </Link>

              <div
                className="rounded-lg border p-4 hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer"
                style={{ animationDelay: "0.7s" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-center gap-2 mb-2">
                  <AnimatedIcon
                    icon={BarChart3}
                    animation="pulse"
                    className="text-teal-600"
                  />
                  <h3 className="font-semibold">Analytics & Reports</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Sales performance analytics and custom reports
                </p>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                  Coming Soon
                </span>
              </div>

              <Link to="/crm/possession-handover" className="block">
                <div
                  className="rounded-lg border p-4 hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer"
                  style={{ animationDelay: "0.8s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center gap-2 mb-2">
                    <AnimatedIcon
                      icon={Home}
                      animation="float"
                      className="text-emerald-600"
                    />
                    <h3 className="font-semibold">Possession & Handover</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Complete possession workflow from dues clearance to handover
                    and maintenance
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                      Dues Clearance
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      Inspection
                    </span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                      Handover
                    </span>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                      Maintenance
                    </span>
                  </div>
                </div>
              </Link>

              <div
                className="rounded-lg border p-4 hover-lift animate-scaleIn group relative overflow-hidden cursor-pointer"
                style={{ animationDelay: "0.9s" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-center gap-2 mb-2">
                  <AnimatedIcon
                    icon={MessageSquare}
                    animation="float"
                    className="text-slate-600"
                  />
                  <h3 className="font-semibold">Communication Hub</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Email integration, templates, and communication tracking
                </p>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                  Coming Soon
                </span>
              </div>
            </div>

            {/* CRM Overview Stats - Tenant Specific */}
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {tenantData.stats.totalLeads}
                </div>
                <div className="text-sm text-muted-foreground">Total Leads</div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+12%</span>
                </div>
                {isSuperAdmin && (
                  <div className="text-xs text-gray-500 mt-1">
                    {tenantData.name}
                  </div>
                )}
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {tenantData.stats.activeDeals}
                </div>
                <div className="text-sm text-muted-foreground">
                  Active Deals
                </div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+8%</span>
                </div>
                {isSuperAdmin && (
                  <div className="text-xs text-gray-500 mt-1">
                    {tenantData.name}
                  </div>
                )}
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {tenantData.stats.pipelineValue}
                </div>
                <div className="text-sm text-muted-foreground">
                  Pipeline Value
                </div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+15%</span>
                </div>
                {isSuperAdmin && (
                  <div className="text-xs text-gray-500 mt-1">
                    {tenantData.name}
                  </div>
                )}
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {tenantData.stats.conversionRate}
                </div>
                <div className="text-sm text-muted-foreground">
                  Conversion Rate
                </div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+3.2%</span>
                </div>
                {isSuperAdmin && (
                  <div className="text-xs text-gray-500 mt-1">
                    {tenantData.name}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-6 bg-white rounded-lg border shadow-sm">
              <h4 className="font-semibold mb-4 flex items-center gap-2 text-gray-900">
                <Zap className="h-4 w-4 text-emerald-600" />
                Quick Actions
              </h4>
              <div className="grid gap-3 md:grid-cols-4">
                <button
                  onClick={() => (window.location.href = "/crm/leads")}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer font-medium text-sm"
                >
                  <Target className="h-4 w-4" />
                  Manage Leads
                </button>
                <button
                  onClick={() => (window.location.href = "/crm/contacts")}
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors cursor-pointer font-medium text-sm"
                >
                  <Plus className="h-4 w-4" />
                  Add Contact
                </button>
                <button
                  onClick={() => {
                    setModals((prev) => ({ ...prev, scheduleCall: true }));
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors cursor-pointer font-medium text-sm"
                >
                  <Phone className="h-4 w-4" />
                  Schedule Call
                </button>
                <button
                  onClick={() => {
                    setModals((prev) => ({ ...prev, createProposal: true }));
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors cursor-pointer font-medium text-sm"
                >
                  <FileText className="h-4 w-4" />
                  Create Proposal
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Client Modal */}
      <Dialog
        open={modals.addClient}
        onOpenChange={(open) =>
          setModals((prev) => ({ ...prev, addClient: open }))
        }
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
            <DialogDescription>
              Add a new client to{" "}
              {isSuperAdmin ? tenantData.name : "your CRM system"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="client-name">Client Name</Label>
                <Input id="client-name" placeholder="Enter client name" />
              </div>
              <div>
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" placeholder="Enter company name" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="client-email">Email</Label>
                <Input
                  id="client-email"
                  type="email"
                  placeholder="client@example.com"
                />
              </div>
              <div>
                <Label htmlFor="client-phone">Phone</Label>
                <Input id="client-phone" placeholder="+91-9876543210" />
              </div>
            </div>
            <div>
              <Label>Client Type</Label>
              <Select defaultValue="individual">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="client-notes">Notes</Label>
              <textarea
                id="client-notes"
                className="w-full p-2 border rounded-md min-h-[80px]"
                placeholder="Add any additional notes about this client..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  setModals((prev) => ({ ...prev, addClient: false }))
                }
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Adding new client...");
                  setModals((prev) => ({ ...prev, addClient: false }));
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Client
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Call Modal */}
      <Dialog
        open={modals.scheduleCall}
        onOpenChange={(open) =>
          setModals((prev) => ({ ...prev, scheduleCall: open }))
        }
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Schedule Call</DialogTitle>
            <DialogDescription>
              Schedule a call with a lead or client
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Select Contact</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a contact" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contact1">
                    John Smith - BuildCorp
                  </SelectItem>
                  <SelectItem value="contact2">
                    Sarah Johnson - Metro Realty
                  </SelectItem>
                  <SelectItem value="contact3">
                    Mike Wilson - Skyline Dev
                  </SelectItem>
                  <SelectItem value="new">+ Add New Contact</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="call-date">Date</Label>
                <Input id="call-date" type="date" />
              </div>
              <div>
                <Label htmlFor="call-time">Time</Label>
                <Input id="call-time" type="time" />
              </div>
            </div>
            <div>
              <Label>Call Type</Label>
              <Select defaultValue="sales">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales Call</SelectItem>
                  <SelectItem value="demo">Product Demo</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                  <SelectItem value="support">Support Call</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="call-agenda">Agenda</Label>
              <textarea
                id="call-agenda"
                className="w-full p-2 border rounded-md min-h-[80px]"
                placeholder="What will you discuss in this call..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  setModals((prev) => ({ ...prev, scheduleCall: false }))
                }
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Scheduling call...");
                  setModals((prev) => ({ ...prev, scheduleCall: false }));
                }}
              >
                <Phone className="mr-2 h-4 w-4" />
                Schedule Call
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Proposal Modal */}
      <Dialog
        open={modals.createProposal}
        onOpenChange={(open) =>
          setModals((prev) => ({ ...prev, createProposal: open }))
        }
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create Proposal</DialogTitle>
            <DialogDescription>
              Create a new business proposal or quote
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="proposal-title">Proposal Title</Label>
                <Input id="proposal-title" placeholder="Enter proposal title" />
              </div>
              <div>
                <Label>Client</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client1">
                      BuildCorp Constructions
                    </SelectItem>
                    <SelectItem value="client2">Metro Realty Group</SelectItem>
                    <SelectItem value="client3">Skyline Developers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Proposal Type</Label>
                <Select defaultValue="quote">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quote">Quote/Estimate</SelectItem>
                    <SelectItem value="project">Project Proposal</SelectItem>
                    <SelectItem value="service">Service Agreement</SelectItem>
                    <SelectItem value="partnership">
                      Partnership Proposal
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="proposal-value">Proposal Value (₹)</Label>
                <Input
                  id="proposal-value"
                  type="number"
                  placeholder="Enter amount"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="proposal-description">Description</Label>
              <textarea
                id="proposal-description"
                className="w-full p-2 border rounded-md min-h-[100px]"
                placeholder="Describe the proposal details, scope of work, deliverables..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="valid-until">Valid Until</Label>
                <Input id="valid-until" type="date" />
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
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  setModals((prev) => ({ ...prev, createProposal: false }))
                }
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Creating proposal...");
                  setModals((prev) => ({ ...prev, createProposal: false }));
                }}
              >
                <FileText className="mr-2 h-4 w-4" />
                Create Proposal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}

// Create Super Admin user for demonstration
const createSuperAdminUser = (): TenantUser => ({
  id: "user_super_001",
  tenantId: "system",
  username: "superadmin",
  email: "admin@buildsaathi.com",
  firstName: "Super",
  lastName: "Admin",
  designation: "System Administrator",
  department: "IT",
  roleId: "super_admin",
  permissions: ["*"],
  status: "active",
  emailVerified: true,
  phoneVerified: true,
  mfaEnabled: true,
  tenantRole: "owner",
  joinedAt: "2024-01-01T00:00:00Z",
  profile: {
    bio: "System Super Administrator with access to all tenants",
    skills: ["System Administration", "Multi-tenant Management"],
  },
  security: {
    passwordPolicy: "strong",
    sessionTimeout: 3600,
    ipWhitelist: [],
  },
  preferences: {
    theme: "light",
    language: "en",
    timezone: "Asia/Kolkata",
    notifications: { email: true, push: true, sms: false },
  },
  metadata: {
    source: "system",
    onboardingCompleted: true,
    terms: {
      accepted: true,
      version: "1.0",
      acceptedAt: "2024-01-01T00:00:00Z",
    },
  },
});

export default function CRM() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  const isSuperAdmin =
    currentUser?.role === "super_admin" ||
    currentUser?.email === "admin@buildsaathi.com";

  const userForProvider = isSuperAdmin ? createSuperAdminUser() : currentUser;

  return (
    <PermissionProvider
      user={userForProvider}
      tenantId={userForProvider?.tenantId || "system"}
    >
      <CRMContent />
    </PermissionProvider>
  );
}
