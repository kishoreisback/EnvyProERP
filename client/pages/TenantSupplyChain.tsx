import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { PermissionProvider } from "../components/user-management/PermissionProvider";
import { TenantSupplyChainDashboard } from "@/components/supply-chain";
import { TenantUser } from "../components/user-management/types";
import { mockTenantSupplyChainConfigs } from "@/components/supply-chain/data";

export default function TenantSupplyChain() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tab } = useParams<{ tab: string }>();

  // Get tenant ID from URL search params or default to first tenant
  const searchParams = new URLSearchParams(location.search);
  const tenantIdFromUrl = searchParams.get("tenant");
  const initialTenant =
    tenantIdFromUrl && mockTenantSupplyChainConfigs.find((t) => t.tenantId === tenantIdFromUrl)
      ? tenantIdFromUrl
      : mockTenantSupplyChainConfigs[0].tenantId;

  // State for current tenant (can be changed for demo purposes)
  const [currentTenantId] = useState(initialTenant);

  // Use tab from params or default to overview
  const currentTab = tab || "overview";

  // Redirect to default tab if no tab is specified
  useEffect(() => {
    if (
      location.pathname === "/supply-chain/tenant" ||
      location.pathname === "/supply-chain/tenant/"
    ) {
      navigate("/supply-chain/tenant/overview", { replace: true });
    }
  }, [location.pathname, navigate]);

  // Get current tenant info
  const currentTenant = mockTenantSupplyChainConfigs.find((t) => t.tenantId === currentTenantId);

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
    id: "scm_admin_001",
    tenantId: currentTenant.tenantId,
    username: "scm.admin",
    email: `admin@${currentTenant.tenantName.toLowerCase().replace(/\s+/g, '')}.com`,
    firstName: "Supply Chain",
    lastName: "Manager",
    phone: "+91-9876543210",
    avatar: "SM",
    employeeId: "SCM001",
    designation: "Supply Chain Manager",
    department: "Supply Chain & Procurement",
    location: "Head Office",
    roleId: "role_scm_admin",
    permissions: [
      "suppliers.*",
      "procurement.*",
      "logistics.*",
      "analytics.*",
      "compliance.*",
      "performance.*",
    ], // Full SCM access for demo
    customPermissions: [],
    status: "active",
    emailVerified: true,
    phoneVerified: true,
    mfaEnabled: true,
    lastLogin: new Date().toISOString(),
    tenantRole: "admin",
    joinedAt: "2024-01-01T00:00:00Z",
    invitedBy: "system",
    profile: {
      bio: "Supply Chain Management Administrator",
      skills: [
        "Supplier Management",
        "Procurement",
        "Logistics",
        "Supply Chain Analytics",
        "Risk Management",
      ],
      certifications: ["Supply Chain Management", "Procurement Excellence"],
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
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-green-900 dark:text-green-100">
                  {currentTenant.tenantName} - Supply Chain Management
                </h2>
                <p className="text-green-700 dark:text-green-300 text-sm">
                  Comprehensive supplier and logistics management for{" "}
                  {currentTenant.industryType.replace('_', ' ')} industry
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-green-600 dark:text-green-400">
                  Logged in as: {currentUser.firstName} {currentUser.lastName}
                </span>
                <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-medium">
                  {currentUser.avatar}
                </div>
              </div>
            </div>
          </div>

          {/* Main Tenant Supply Chain Dashboard */}
          <TenantSupplyChainDashboard
            tenantId={currentTenantId}
            currentTab={currentTab}
            onTabChange={(tab) => navigate(`/supply-chain/tenant/${tab}`)}
          />
        </div>
      </PermissionProvider>
    </MainLayout>
  );
}
