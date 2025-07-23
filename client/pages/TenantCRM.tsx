import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { PermissionProvider } from "../components/user-management/PermissionProvider";
import { TenantCRMDashboard } from "../components/crm/TenantCRMDashboard";
import { TenantUser } from "../components/user-management/types";
import { availableTenants } from "../components/crm/constants";

export default function TenantCRM() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tab } = useParams<{ tab: string }>();

  // Get tenant ID from URL search params or default to first tenant
  const searchParams = new URLSearchParams(location.search);
  const tenantIdFromUrl = searchParams.get("tenant");
  const initialTenant =
    tenantIdFromUrl && availableTenants.find((t) => t.id === tenantIdFromUrl)
      ? tenantIdFromUrl
      : availableTenants[0].id;

  // State for current tenant (can be changed for demo purposes)
  const [currentTenantId] = useState(initialTenant);

  // Use tab from params or default to overview
  const currentTab = tab || "overview";

  // Redirect to default tab if no tab is specified
  useEffect(() => {
    if (
      location.pathname === "/crm/tenant" ||
      location.pathname === "/crm/tenant/"
    ) {
      navigate("/crm/tenant/overview", { replace: true });
    }
  }, [location.pathname, navigate]);

  // Get current tenant info
  const currentTenant = availableTenants.find((t) => t.id === currentTenantId);

  if (!currentTenant) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">
              Tenant Not Found
            </h1>
            <p className="text-muted-foreground">
              The requested tenant could not be found.
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Create current user object for the selected tenant
  const currentUser: TenantUser = {
    id: currentTenant.adminUser.id,
    tenantId: currentTenant.adminUser.tenantId,
    username: currentTenant.adminUser.username,
    email: currentTenant.adminUser.email,
    firstName: currentTenant.adminUser.firstName,
    lastName: currentTenant.adminUser.lastName,
    phone: "+91-9876543210",
    avatar: `${currentTenant.adminUser.firstName[0]}${currentTenant.adminUser.lastName[0]}`,
    employeeId: "CRM001",
    designation: "CRM Administrator",
    department: "Sales & Marketing",
    location: "Head Office",
    roleId: "role_crm_admin",
    permissions: [
      "leads.*",
      "communication.*",
      "sources.*",
      "analytics.*",
      "deals.*",
      "lead_sources.*",
    ], // Full CRM access for demo
    customPermissions: [],
    status: "active",
    emailVerified: true,
    phoneVerified: true,
    mfaEnabled: true,
    lastLogin: new Date().toISOString(),
    tenantRole: currentTenant.adminUser.tenantRole,
    joinedAt: "2024-01-01T00:00:00Z",
    invitedBy: "system",
    profile: {
      bio: "CRM System Administrator",
      skills: [
        "Lead Management",
        "Sales Analytics",
        "Customer Communication",
        "Pipeline Management",
      ],
      certifications: ["CRM Certification", "Sales Management"],
    },
    security: {
      sessionTimeout: 480,
      deviceTrust: true,
      failedLoginAttempts: 0,
      accountLocked: false,
    },
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: new Date().toISOString(),
    createdBy: "system",
  };

  return (
    <MainLayout>
      <PermissionProvider user={currentUser} tenantId={currentUser.tenantId}>
        <div className="container mx-auto px-4 py-8 space-y-6">
          {/* Tenant Context Information */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                  {currentTenant.name} - CRM Dashboard
                </h2>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  Tenant-driven customer relationship management for{" "}
                  {currentTenant.type} business
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-blue-600 dark:text-blue-400">
                  Logged in as: {currentUser.firstName} {currentUser.lastName}
                </span>
                <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                  {currentUser.avatar}
                </div>
              </div>
            </div>
          </div>

          {/* Main Tenant CRM Dashboard */}
          <TenantCRMDashboard
            currentTab={currentTab}
            onTabChange={(tab) => navigate(`/crm/tenant/${tab}`)}
          />
        </div>
      </PermissionProvider>
    </MainLayout>
  );
}
